import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);

    const body = await req.json().catch(() => ({}));
    const {
      questionBankId,
      clearSessions = true,
      clearExams = true,
      clearNotesAndBookmarks = false,
    } = body;

    // Collect target user IDs
    let userIds: string[] = [];

    if (authUser) {
      userIds.push(authUser.userId);
      if (
        authUser.role === 'GUEST' ||
        authUser.email?.includes('guest') ||
        authUser.userId === 'guest-learner'
      ) {
        userIds.push('guest-learner');
      }
    } else {
      // For unauthenticated visitors calling reset, target any guest users in database
      const guestUsers = await prisma.user.findMany({
        where: { email: { contains: 'guest' } },
        select: { id: true },
      });
      userIds = [...guestUsers.map((g) => g.id), 'guest-learner'];
    }

    // Determine questionBankId filter (null or 'all' means reset all banks)
    const targetBankId =
      questionBankId && questionBankId !== 'all' ? questionBankId : null;

    const userCondition = { userId: { in: userIds } };
    const bankCondition = targetBankId ? { questionBankId: targetBankId } : {};

    // 1. Delete UserQuestionProgress (resets all answered questions to unanswered/NEW)
    const progressDelete = await prisma.userQuestionProgress.deleteMany({
      where: {
        ...userCondition,
        ...bankCondition,
      },
    });

    // 2. Delete Practice Sessions & Answers
    let practiceSessionsDeleted = 0;
    if (clearSessions) {
      const sessions = await prisma.practiceSession.findMany({
        where: {
          ...userCondition,
          ...bankCondition,
        },
        select: { id: true },
      });
      const sessionIds = sessions.map((s) => s.id);
      if (sessionIds.length > 0) {
        await prisma.practiceAnswer.deleteMany({
          where: { sessionId: { in: sessionIds } },
        });
        const res = await prisma.practiceSession.deleteMany({
          where: { id: { in: sessionIds } },
        });
        practiceSessionsDeleted = res.count;
      }
    }

    // 3. Delete Mock Exam Attempts & Answers
    let examAttemptsDeleted = 0;
    if (clearExams) {
      const attempts = await prisma.mockExamAttempt.findMany({
        where: {
          ...userCondition,
          ...bankCondition,
        },
        select: { id: true },
      });
      const attemptIds = attempts.map((a) => a.id);
      if (attemptIds.length > 0) {
        await prisma.mockExamAnswer.deleteMany({
          where: { examAttemptId: { in: attemptIds } },
        });
        const res = await prisma.mockExamAttempt.deleteMany({
          where: { id: { in: attemptIds } },
        });
        examAttemptsDeleted = res.count;
      }
    }

    // 4. Delete DailyStudyActivity
    await prisma.dailyStudyActivity.deleteMany({
      where: {
        ...userCondition,
        ...bankCondition,
      },
    });

    // 5. Reset progress percent in enrollments
    await prisma.userQuestionBankEnrollment.updateMany({
      where: {
        ...userCondition,
        ...bankCondition,
      },
      data: {
        progressPercent: 0,
        lastStudiedAt: null,
      },
    });

    // 6. Optional: Clear Notes, Bookmarks & Highlights if explicitly requested
    if (clearNotesAndBookmarks) {
      await Promise.all([
        prisma.questionBookmark.deleteMany({
          where: {
            ...userCondition,
            ...bankCondition,
          },
        }),
        prisma.questionNote.deleteMany({
          where: {
            ...userCondition,
            ...bankCondition,
          },
        }),
        prisma.questionHighlight.deleteMany({
          where: {
            ...userCondition,
            ...bankCondition,
          },
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'Đã xóa toàn bộ lịch sử làm bài và khôi phục bộ câu hỏi về trạng thái ban đầu thành công!',
      details: {
        resetQuestions: progressDelete.count,
        deletedSessions: practiceSessionsDeleted,
        deletedExams: examAttemptsDeleted,
        bankId: targetBankId || 'all',
      },
    });
  } catch (error) {
    console.error('Reset progress error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi xóa lịch sử làm bài và khôi phục bộ câu hỏi' },
      { status: 500 }
    );
  }
}
