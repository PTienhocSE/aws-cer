/**
 * Real Study Streak Calculator Module
 * Calculates current and longest study streak strictly from DailyStudyActivity records.
 */

export interface ActivityRecord {
  activityDate: string; // YYYY-MM-DD
  answeredQuestions: number;
}

export function calculateStreak(
  activities: ActivityRecord[],
  currentDateStr: string // YYYY-MM-DD in user timezone
): { currentStreak: number; longestStreak: number; todayCompleted: number } {
  if (!activities || activities.length === 0) {
    return { currentStreak: 0, longestStreak: 0, todayCompleted: 0 };
  }

  // Filter active days with at least 1 answered question
  const activeDates = new Set<string>();
  let todayCompleted = 0;

  activities.forEach((a) => {
    if (a.answeredQuestions > 0) {
      activeDates.add(a.activityDate);
    }
    if (a.activityDate === currentDateStr) {
      todayCompleted = a.answeredQuestions;
    }
  });

  const sortedDates = Array.from(activeDates).sort();
  if (sortedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, todayCompleted: 0 };
  }

  // Helper date parsing
  const parseDate = (str: string) => {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Calculate Current Streak
  let currentStreak = 0;
  const today = parseDate(currentDateStr);
  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);

  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);

  let checkDate: Date;
  if (activeDates.has(todayStr)) {
    checkDate = today;
  } else if (activeDates.has(yesterdayStr)) {
    checkDate = yesterday;
  } else {
    currentStreak = 0;
    checkDate = today;
  }

  if (activeDates.has(formatDate(checkDate))) {
    while (activeDates.has(formatDate(checkDate))) {
      currentStreak++;
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
    }
  }

  // Calculate Longest Streak
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  sortedDates.forEach((dateStr) => {
    const currDate = parseDate(dateStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffTime = currDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevDate = currDate;
  });

  return {
    currentStreak,
    longestStreak,
    todayCompleted,
  };
}
