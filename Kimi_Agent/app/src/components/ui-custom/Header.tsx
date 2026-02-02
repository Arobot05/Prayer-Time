import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">SIEA Mosque</h1>
            <p className="text-xs text-emerald-400/70 hidden sm:block">Prayer Times</p>
          </div>
        </div>

        {/* Date Display */}
        <div className="text-right">
          <p className="text-emerald-400 text-sm font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-emerald-500/60 text-xs">
            Islamic Date
          </p>
        </div>
      </div>
    </header>
  );
}
