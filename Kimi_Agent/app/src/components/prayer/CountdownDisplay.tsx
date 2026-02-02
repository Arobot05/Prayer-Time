import type { CountdownInfo } from '@/hooks/usePrayerTimes';
import { Clock, Volume2, Users } from 'lucide-react';

interface CountdownDisplayProps {
  nextAzan: CountdownInfo | null;
  nextIqamah: CountdownInfo | null;
  currentTime: Date;
}

export function CountdownDisplay({ nextAzan, nextIqamah, currentTime }: CountdownDisplayProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isUrgent = (seconds: number) => seconds <= 300; // 5 minutes

  return (
    <div className="w-full space-y-4">
      {/* Current Time Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium">{formatDate(currentTime)}</span>
        </div>
        <div className="mt-2 text-5xl md:text-7xl font-bold font-mono text-white tabular-nums tracking-tight">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Countdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Azan */}
        {nextAzan && (
          <div className={`
            relative overflow-hidden rounded-2xl p-5 md:p-6
            border transition-all duration-300
            ${isUrgent(nextAzan.seconds) 
              ? 'bg-amber-500/20 border-amber-500/50 shadow-lg shadow-amber-500/20' 
              : 'bg-gradient-to-br from-amber-500/10 to-amber-900/10 border-amber-500/20'}
          `}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`
                p-2 rounded-xl
                ${isUrgent(nextAzan.seconds) ? 'bg-amber-500 text-slate-950' : 'bg-amber-500/20 text-amber-400'}
              `}>
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-amber-400 text-sm font-medium">Next Azan</p>
                <p className="text-white font-semibold">{nextAzan.label.replace(' Azan', '')}</p>
              </div>
            </div>
            <div className={`
              font-mono font-bold text-4xl md:text-5xl tabular-nums
              ${isUrgent(nextAzan.seconds) ? 'text-amber-300 animate-pulse' : 'text-amber-200'}
            `}>
              {nextAzan.time}
            </div>
            <p className="mt-2 text-amber-400/70 text-sm">
              {isUrgent(nextAzan.seconds) ? 'Starting soon!' : 'Time remaining'}
            </p>
          </div>
        )}

        {/* Next Iqamah */}
        {nextIqamah && (
          <div className={`
            relative overflow-hidden rounded-2xl p-5 md:p-6
            border transition-all duration-300
            ${isUrgent(nextIqamah.seconds) 
              ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
              : 'bg-gradient-to-br from-cyan-500/10 to-cyan-900/10 border-cyan-500/20'}
          `}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`
                p-2 rounded-xl
                ${isUrgent(nextIqamah.seconds) ? 'bg-cyan-500 text-slate-950' : 'bg-cyan-500/20 text-cyan-400'}
              `}>
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-cyan-400 text-sm font-medium">Next Iqamah</p>
                <p className="text-white font-semibold">{nextIqamah.label.replace(' Iqamah', '')}</p>
              </div>
            </div>
            <div className={`
              font-mono font-bold text-4xl md:text-5xl tabular-nums
              ${isUrgent(nextIqamah.seconds) ? 'text-cyan-300 animate-pulse' : 'text-cyan-200'}
            `}>
              {nextIqamah.time}
            </div>
            <p className="mt-2 text-cyan-400/70 text-sm">
              {isUrgent(nextIqamah.seconds) ? 'Prayer starting soon!' : 'Time remaining'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
