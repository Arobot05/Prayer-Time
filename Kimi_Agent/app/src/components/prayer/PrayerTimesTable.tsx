import type { PrayerTime } from '@/hooks/usePrayerTimes';
import { Moon, Sun, CloudSun, Sunset, MoonStar } from 'lucide-react';

interface PrayerTimesTableProps {
  prayers: PrayerTime[];
  currentPrayer: string | null;
}

const prayerIcons: Record<string, React.ReactNode> = {
  'Fajr': <Moon className="w-5 h-5" />,
  'Dhuhr': <Sun className="w-5 h-5" />,
  'Asr': <CloudSun className="w-5 h-5" />,
  'Maghrib': <Sunset className="w-5 h-5" />,
  'Isha': <MoonStar className="w-5 h-5" />
};

export function PrayerTimesTable({ prayers, currentPrayer }: PrayerTimesTableProps) {
  if (prayers.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-pulse text-emerald-400">Loading prayer times...</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-slate-950/40 backdrop-blur-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-500/20">
            <th className="py-3 px-2 text-left text-emerald-400 font-semibold text-sm md:text-base">Prayer</th>
            <th className="py-3 px-2 text-center text-amber-400 font-semibold text-sm md:text-base">
              <span className="flex items-center justify-center gap-1">
                <span className="hidden sm:inline">Azan</span>
                <span className="sm:hidden">Azan</span>
              </span>
            </th>
            <th className="py-3 px-2 text-center text-cyan-400 font-semibold text-sm md:text-base">
              <span className="flex items-center justify-center gap-1">
                <span className="hidden sm:inline">Iqamah</span>
                <span className="sm:hidden">Iqamah</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {prayers.map((prayer, index) => {
            const isCurrent = currentPrayer === prayer.name;
            return (
              <tr 
                key={prayer.name}
                className={`
                  border-b border-emerald-500/10 last:border-b-0
                  transition-all duration-300
                  ${isCurrent ? 'bg-emerald-500/20 animate-pulse' : 'hover:bg-emerald-500/5'}
                  ${index % 2 === 0 ? 'bg-slate-950/20' : 'bg-slate-950/10'}
                `}
              >
                <td className="py-3 px-2 md:py-4 md:px-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className={`
                      p-1.5 md:p-2 rounded-lg
                      ${isCurrent ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'}
                    `}>
                      {prayerIcons[prayer.name]}
                    </span>
                    <span className={`
                      font-semibold text-sm md:text-lg
                      ${isCurrent ? 'text-emerald-400' : 'text-slate-200'}
                    `}>
                      {prayer.name}
                    </span>
                    {isCurrent && (
                      <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/30 text-emerald-300">
                        Now
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2 md:py-4 md:px-4 text-center">
                  <span className={`
                    font-mono font-bold text-lg md:text-2xl tabular-nums
                    ${isCurrent ? 'text-amber-400' : 'text-amber-300/90'}
                  `}>
                    {prayer.azan}
                  </span>
                </td>
                <td className="py-3 px-2 md:py-4 md:px-4 text-center">
                  <span className={`
                    font-mono font-bold text-lg md:text-2xl tabular-nums
                    ${isCurrent ? 'text-cyan-400' : 'text-cyan-300/90'}
                  `}>
                    {prayer.iqamah}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
