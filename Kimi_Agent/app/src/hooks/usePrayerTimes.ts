import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  getPrayerForDate, 
  getIqamahForDate,
  parseTime, 
  formatTimeDiff,
  loadPrayerDataFromStorage,
  loadIqamahDataFromStorage,
  savePrayerDataToStorage,
  saveIqamahDataToStorage,
  PRAYER_DATA,
  IQAMAH_DATA
} from '@/data/prayerData';

export interface PrayerTime {
  name: string;
  azan: string;
  iqamah: string;
}

export interface CountdownInfo {
  label: string;
  time: string;
  seconds: number;
  isActive: boolean;
}

export interface PrayerState {
  currentTime: Date;
  prayers: PrayerTime[];
  nextAzan: CountdownInfo | null;
  nextIqamah: CountdownInfo | null;
  currentPrayer: string | null;
  isJumuah: boolean;
}

export function usePrayerTimes() {
  const [state, setState] = useState<PrayerState>({
    currentTime: new Date(),
    prayers: [],
    nextAzan: null,
    nextIqamah: null,
    currentPrayer: null,
    isJumuah: false
  });

  // Use refs for mutable data that persists across renders
  const prayerDataRef = useRef(loadPrayerDataFromStorage() || { ...PRAYER_DATA });
  const iqamahDataRef = useRef(loadIqamahDataFromStorage() || { ...IQAMAH_DATA });

  const getPrayerData = useCallback((dateStr: string) => {
    const data = prayerDataRef.current;
    if (data[dateStr]) return data[dateStr];
    return getPrayerForDate(dateStr);
  }, []);

  const getIqamahData = useCallback((dateStr: string) => {
    const data = iqamahDataRef.current;
    if (data[dateStr]) return data[dateStr];
    return getIqamahForDate(dateStr);
  }, []);

  const updatePrayerTimes = useCallback(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const todayPrayers = getPrayerData(todayStr);
    const todayIqamah = getIqamahData(todayStr);

    // Build prayer times with actual iqamah data
    const prayers: PrayerTime[] = [
      { name: 'Fajr', azan: todayPrayers.fajr, iqamah: todayIqamah.fajr },
      { name: 'Dhuhr', azan: todayPrayers.dhuhr, iqamah: todayIqamah.dhuhr },
      { name: 'Asr', azan: todayPrayers.asr, iqamah: todayIqamah.asr },
      { name: 'Maghrib', azan: todayPrayers.maghrib, iqamah: todayIqamah.maghrib },
      { name: 'Isha', azan: todayPrayers.isha, iqamah: todayIqamah.isha }
    ];

    // Check if today is Friday
    const isJumuah = now.getDay() === 5;

    // Find next azan and iqamah
    let nextAzan: CountdownInfo | null = null;
    let nextIqamah: CountdownInfo | null = null;
    let currentPrayer: string | null = null;

    for (const prayer of prayers) {
      const azanTime = parseTime(prayer.azan);
      const iqamahTime = parseTime(prayer.iqamah);

      // Check if currently in this prayer time (between azan and iqamah)
      if (now >= azanTime && now < iqamahTime) {
        currentPrayer = prayer.name;
      }

      // Find next azan
      if (!nextAzan && now < azanTime) {
        const diffSeconds = Math.floor((azanTime.getTime() - now.getTime()) / 1000);
        nextAzan = {
          label: `${prayer.name} Azan`,
          time: formatTimeDiff(diffSeconds),
          seconds: diffSeconds,
          isActive: true
        };
      }

      // Find next iqamah
      if (!nextIqamah && now < iqamahTime) {
        const diffSeconds = Math.floor((iqamahTime.getTime() - now.getTime()) / 1000);
        nextIqamah = {
          label: `${prayer.name} Iqamah`,
          time: formatTimeDiff(diffSeconds),
          seconds: diffSeconds,
          isActive: true
        };
      }
    }

    // If no next prayer today, show tomorrow's Fajr
    if (!nextAzan) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      const tomorrowPrayers = getPrayerData(tomorrowStr);
      const fajrTime = parseTime(tomorrowPrayers.fajr);
      fajrTime.setDate(fajrTime.getDate() + 1);
      const diffSeconds = Math.floor((fajrTime.getTime() - now.getTime()) / 1000);
      nextAzan = {
        label: 'Tomorrow Fajr Azan',
        time: formatTimeDiff(diffSeconds),
        seconds: diffSeconds,
        isActive: true
      };
    }

    if (!nextIqamah) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      const tomorrowIqamah = getIqamahData(tomorrowStr);
      const iqamahTime = parseTime(tomorrowIqamah.fajr);
      iqamahTime.setDate(iqamahTime.getDate() + 1);
      const diffSeconds = Math.floor((iqamahTime.getTime() - now.getTime()) / 1000);
      nextIqamah = {
        label: 'Tomorrow Fajr Iqamah',
        time: formatTimeDiff(diffSeconds),
        seconds: diffSeconds,
        isActive: true
      };
    }

    setState({
      currentTime: now,
      prayers,
      nextAzan,
      nextIqamah,
      currentPrayer,
      isJumuah
    });
  }, [getPrayerData, getIqamahData]);

  // Update prayer times every second
  useEffect(() => {
    updatePrayerTimes();
    const interval = setInterval(updatePrayerTimes, 1000);
    return () => clearInterval(interval);
  }, [updatePrayerTimes]);

  // Reload at midnight
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      window.location.reload();
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  // Reload every 5 minutes to ensure sync
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Save edited prayer data
  const savePrayerData = useCallback((dateStr: string, prayerData: { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string }) => {
    prayerDataRef.current[dateStr] = prayerData;
    savePrayerDataToStorage(prayerDataRef.current);
    updatePrayerTimes();
  }, [updatePrayerTimes]);

  // Save edited iqamah data
  const saveIqamahData = useCallback((dateStr: string, iqamahData: { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string }) => {
    iqamahDataRef.current[dateStr] = iqamahData;
    saveIqamahDataToStorage(iqamahDataRef.current);
    updatePrayerTimes();
  }, [updatePrayerTimes]);

  // Get all prayer data (for setup)
  const getAllPrayerData = useCallback(() => {
    return prayerDataRef.current;
  }, []);

  // Get all iqamah data (for setup)
  const getAllIqamahData = useCallback(() => {
    return iqamahDataRef.current;
  }, []);

  return {
    ...state,
    savePrayerData,
    saveIqamahData,
    getAllPrayerData,
    getAllIqamahData,
    getPrayerData,
    getIqamahData
  };
}
