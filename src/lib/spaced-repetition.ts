export type MasteryStatus = 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED';

export interface SM2Input {
  quality: number; // 0 to 5
  easinessFactor: number; // default 2.5
  intervalDays: number; // current interval in days
  repetitions: number; // consecutive correct count
}

export interface SM2Output {
  easinessFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: Date;
  masteryStatus: MasteryStatus;
}

export function calculateSuperMemo2(input: SM2Input): SM2Output {
  let { quality, easinessFactor, intervalDays, repetitions } = input;

  if (quality < 0) quality = 0;
  if (quality > 5) quality = 5;

  if (quality >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easinessFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    intervalDays = 1;
  }

  // Update Easiness Factor (EF)
  easinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easinessFactor < 1.3) easinessFactor = 1.3;

  // Next review date calculation
  const nextReviewAt = new Date();
  nextReviewAt.setUTCDate(nextReviewAt.getUTCDate() + intervalDays);

  let masteryStatus: MasteryStatus = 'NEW';
  if (repetitions >= 5 || intervalDays >= 21) {
    masteryStatus = 'MASTERED';
  } else if (repetitions >= 2 || intervalDays >= 6) {
    masteryStatus = 'REVIEW';
  } else if (repetitions >= 1) {
    masteryStatus = 'LEARNING';
  }

  return {
    easinessFactor,
    intervalDays,
    repetitions,
    nextReviewAt,
    masteryStatus,
  };
}

export const calculateSM2 = calculateSuperMemo2;
