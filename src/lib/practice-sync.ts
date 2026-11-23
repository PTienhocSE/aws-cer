/**
 * Helper quản lý Export / Import Metadata tiến độ làm bài khi làm ở trình duyệt không đăng nhập (máy công ty)
 */

export interface QuestionAnswerMetadata {
  sessionId: string;
  questionId: string;
  isCorrect: boolean;
  selectedOptionIds: string[];
  correctOptionIds: string[];
  answeredAt?: string;
}

export interface OfflineSessionInfo {
  sessionId: string;
  title?: string;
  lastAnsweredAt: string;
  answeredCount: number;
}

const OFFLINE_SESSIONS_KEY = 'aws_cer_offline_sessions_registry';

/**
 * Lưu 1 câu trả lời vào localStorage và đăng ký session
 */
export function recordLocalAnswer(
  sessionId: string,
  questionId: string,
  answerData: {
    selectedOptionIds: string[];
    correctOptionIds: string[];
    isCorrect: boolean;
    confidenceLevel?: number;
    sessionTitle?: string;
    answeredAt?: string;
  }
) {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const now = answerData.answeredAt || new Date().toISOString();
  const sessionKey = `aws_cer_session_${sessionId}_answers`;

  try {
    // 1. Lưu vào answers của session
    const saved = JSON.parse(localStorage.getItem(sessionKey) || '{}');
    saved[questionId] = {
      sessionId,
      questionId,
      selectedOptionIds: answerData.selectedOptionIds,
      correctOptionIds: answerData.correctOptionIds,
      isCorrect: answerData.isCorrect,
      confidenceLevel: answerData.confidenceLevel ?? 3,
      answeredAt: now,
    };
    localStorage.setItem(sessionKey, JSON.stringify(saved));

    // 2. Cập nhật Registry danh sách các session offline
    const registry: Record<string, OfflineSessionInfo> = JSON.parse(
      localStorage.getItem(OFFLINE_SESSIONS_KEY) || '{}'
    );

    registry[sessionId] = {
      sessionId,
      title: answerData.sessionTitle || registry[sessionId]?.title || `Phiên luyện tập`,
      lastAnsweredAt: now,
      answeredCount: Object.keys(saved).length,
    };

    localStorage.setItem(OFFLINE_SESSIONS_KEY, JSON.stringify(registry));
  } catch (err) {
    console.error('Failed to record local answer:', err);
  }
}

/**
 * Lấy danh sách câu trả lời của 1 session cụ thể từ localStorage
 */
export function getLocalAnswersForSession(sessionId: string): QuestionAnswerMetadata[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const sessionKey = `aws_cer_session_${sessionId}_answers`;
    const saved = JSON.parse(localStorage.getItem(sessionKey) || '{}');
    return Object.values(saved).map((item: any) => ({
      sessionId: item.sessionId || sessionId,
      questionId: item.questionId,
      isCorrect: Boolean(item.isCorrect),
      selectedOptionIds: Array.isArray(item.selectedOptionIds) ? item.selectedOptionIds : [],
      correctOptionIds: Array.isArray(item.correctOptionIds) ? item.correctOptionIds : [],
      answeredAt: item.answeredAt || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

/**
 * Quét toàn bộ localStorage để lấy tất cả câu hỏi đã làm offline
 */
export function getAllOfflineAnswers(): QuestionAnswerMetadata[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];

  const results: QuestionAnswerMetadata[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('aws_cer_session_') && key.endsWith('_answers')) {
        const sessionId = key.replace('aws_cer_session_', '').replace('_answers', '');
        const saved = JSON.parse(localStorage.getItem(key) || '{}');
        Object.entries(saved).forEach(([questionId, val]: [string, any]) => {
          results.push({
            sessionId: val.sessionId || sessionId,
            questionId: val.questionId || questionId,
            isCorrect: Boolean(val.isCorrect),
            selectedOptionIds: Array.isArray(val.selectedOptionIds) ? val.selectedOptionIds : [],
            correctOptionIds: Array.isArray(val.correctOptionIds) ? val.correctOptionIds : [],
            answeredAt: val.answeredAt || new Date().toISOString(),
          });
        });
      }
    }
  } catch (err) {
    console.error('Error scanning offline answers:', err);
  }

  return results;
}

/**
 * Lấy danh sách thông tin các session offline
 */
export function getOfflineSessionsList(): OfflineSessionInfo[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const registry: Record<string, OfflineSessionInfo> = JSON.parse(
      localStorage.getItem(OFFLINE_SESSIONS_KEY) || '{}'
    );
    return Object.values(registry);
  } catch {
    return [];
  }
}

/**
 * Xóa dữ liệu câu trả lời offline (toàn bộ hoặc của 1 session)
 */
export function clearOfflineAnswers(sessionId?: string) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    if (sessionId) {
      localStorage.removeItem(`aws_cer_session_${sessionId}_answers`);
      const registry: Record<string, OfflineSessionInfo> = JSON.parse(
        localStorage.getItem(OFFLINE_SESSIONS_KEY) || '{}'
      );
      delete registry[sessionId];
      localStorage.setItem(OFFLINE_SESSIONS_KEY, JSON.stringify(registry));
    } else {
      // Xoá tất cả session answers
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('aws_cer_session_') && key.endsWith('_answers')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem(OFFLINE_SESSIONS_KEY);
    }
  } catch (err) {
    console.error('Error clearing offline answers:', err);
  }
}

/**
 * Xóa toàn bộ cache học tập trên localStorage trình duyệt (offline sessions, mock exams, timer, kết quả thi)
 */
export function clearAllLearningCache() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (
        key.startsWith('aws_cer_session_') ||
        key === OFFLINE_SESSIONS_KEY ||
        key.startsWith('aws_cer_mock_exam_') ||
        key.startsWith('aws_cer_mock_exam_timer_') ||
        key.startsWith('aws_cer_mock_exam_answers_') ||
        key.startsWith('aws_cer_mock_exam_result_')
      ) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error('Error clearing all learning cache:', err);
  }
}

/**
 * Tải danh sách metadata về máy thành file JSON
 */
export function downloadMetadataFile(records: QuestionAnswerMetadata[], filename?: string) {
  if (typeof window === 'undefined') return;
  const jsonStr = JSON.stringify(records, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const now = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  a.href = url;
  a.download = filename || `aws-cer-metadata-${now}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Parse chuỗi JSON hoặc file content thành mảng QuestionAnswerMetadata
 */
export function parseMetadataJson(rawContent: string): QuestionAnswerMetadata[] {
  if (!rawContent || !rawContent.trim()) {
    throw new Error('Nội dung dữ liệu rỗng');
  }

  const parsed = JSON.parse(rawContent.trim());
  let records: any[] = [];

  if (Array.isArray(parsed)) {
    records = parsed;
  } else if (parsed && typeof parsed === 'object') {
    if (Array.isArray(parsed.data)) {
      records = parsed.data;
    } else if (Array.isArray(parsed.records)) {
      records = parsed.records;
    } else {
      // Nếu là dictionary { questionId: { ... } }
      records = Object.values(parsed);
    }
  }

  // Validate và chuẩn hoá từng record
  const validated: QuestionAnswerMetadata[] = [];
  for (const item of records) {
    if (!item || typeof item !== 'object') continue;
    const questionId = item.questionId || item.id;
    if (!questionId || typeof questionId !== 'string') continue;

    validated.push({
      sessionId: String(item.sessionId || 'imported-session'),
      questionId: String(questionId),
      isCorrect: Boolean(item.isCorrect),
      selectedOptionIds: Array.isArray(item.selectedOptionIds) ? item.selectedOptionIds : [],
      correctOptionIds: Array.isArray(item.correctOptionIds) ? item.correctOptionIds : [],
      answeredAt: item.answeredAt || new Date().toISOString(),
    });
  }

  if (validated.length === 0) {
    throw new Error('Không tìm thấy bản ghi câu trả lời hợp lệ trong dữ liệu.');
  }

  return validated;
}
