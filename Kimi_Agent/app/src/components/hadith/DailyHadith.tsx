import type { Hadith } from '@/data/hadithData';
import { BookOpen, Quote, Scroll } from 'lucide-react';

interface DailyHadithProps {
  hadith: Hadith | null;
  loading?: boolean;
}

export function DailyHadith({ hadith, loading }: DailyHadithProps) {
  if (loading) {
    return (
      <div className="w-full p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-slate-950/30">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-emerald-500/20 rounded w-1/3"></div>
          <div className="h-20 bg-emerald-500/10 rounded"></div>
          <div className="h-4 bg-emerald-500/20 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (!hadith) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-slate-950/40 to-emerald-950/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-emerald-500/20 bg-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Daily Hadith</h3>
            <p className="text-emerald-500/70 text-xs">{hadith.source}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Quote Icon */}
        <div className="flex justify-center mb-4">
          <Quote className="w-8 h-8 text-emerald-500/30" />
        </div>

        {/* Hadith Text */}
        <p className="text-slate-200 text-base md:text-lg leading-relaxed text-center mb-6">
          {hadith.text}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          <Scroll className="w-4 h-4 text-emerald-500/50" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {hadith.narrator}
          </span>
          <span className={`
            px-3 py-1 rounded-full border
            ${hadith.grade === 'Sahih' 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}
          `}>
            {hadith.grade}
          </span>
        </div>

        {hadith.chapter && (
          <p className="mt-4 text-center text-emerald-500/60 text-xs">
            {hadith.chapter}
          </p>
        )}
      </div>
    </div>
  );
}
