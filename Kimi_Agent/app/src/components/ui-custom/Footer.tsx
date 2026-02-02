import { Heart, ExternalLink, Building2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-emerald-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-slate-300">SIEA Mosque Prayer Times</p>
              <p className="text-xs text-slate-500">&copy; {currentYear} All rights reserved</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://ahadith.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-emerald-400/70 hover:text-emerald-400 transition-colors"
            >
              Daily Hadith Source
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>for the Ummah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
