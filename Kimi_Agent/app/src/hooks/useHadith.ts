import { useState, useEffect } from 'react';
import { getDailyHadith, type Hadith } from '@/data/hadithData';

export function useHadith() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get daily hadith based on current date
    const dailyHadith = getDailyHadith();
    setHadith(dailyHadith);
    setLoading(false);

    // Refresh at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      const newDailyHadith = getDailyHadith();
      setHadith(newDailyHadith);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return { hadith, loading };
}
