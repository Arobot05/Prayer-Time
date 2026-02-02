import { useState } from 'react';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useHadith } from '@/hooks/useHadith';
import { Header } from '@/components/ui-custom/Header';
import { Footer } from '@/components/ui-custom/Footer';
import { PrayerTimesTable } from '@/components/prayer/PrayerTimesTable';
import { CountdownDisplay } from '@/components/prayer/CountdownDisplay';
import { PrayerSetup } from '@/components/prayer/PrayerSetup';
import { DailyHadith } from '@/components/hadith/DailyHadith';
import { Toaster } from '@/components/ui/sonner';
import { Sparkles, Calendar, Clock, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'display' | 'setup';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('display');
  const { 
    currentTime, 
    prayers, 
    nextAzan, 
    nextIqamah, 
    currentPrayer
  } = usePrayerTimes();
  
  const { hadith, loading: hadithLoading } = useHadith();

  const handleSetupSave = () => {
    // Reload to apply changes
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 text-slate-100">
      <Toaster position="top-center" richColors />
      
      <Header />

      {/* Navigation Tabs */}
      <div className="border-b border-emerald-500/20 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto">
            <Button
              variant={viewMode === 'display' ? 'default' : 'ghost'}
              onClick={() => setViewMode('display')}
              className={viewMode === 'display' 
                ? 'bg-emerald-500 text-slate-950' 
                : 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'}
            >
              <Clock className="w-4 h-4 mr-2" />
              Display
            </Button>
            <Button
              variant={viewMode === 'setup' ? 'default' : 'ghost'}
              onClick={() => setViewMode('setup')}
              className={viewMode === 'setup' 
                ? 'bg-emerald-500 text-slate-950' 
                : 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Setup Times
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Display View */}
        {viewMode === 'display' && (
          <>
            {/* Hero Section */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">Welcome to SIEA Mosque</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Prayer Times & <span className="text-emerald-400">Daily Hadith</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Stay connected with your daily prayers. Accurate prayer times with automatic countdowns and daily hadith reminders.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column - Prayer Times */}
              <div className="lg:col-span-2 space-y-6">
                {/* Countdown Display */}
                <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950/60 to-emerald-950/30 p-5 md:p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Live Countdown</h3>
                  </div>
                  <CountdownDisplay 
                    nextAzan={nextAzan} 
                    nextIqamah={nextIqamah}
                    currentTime={currentTime}
                  />
                </section>

                {/* Prayer Times Table */}
                <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950/60 to-emerald-950/30 p-5 md:p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Today&apos;s Prayer Times</h3>
                  </div>
                  <PrayerTimesTable 
                    prayers={prayers} 
                    currentPrayer={currentPrayer}
                  />
                </section>
              </div>

              {/* Right Column - Hadith & Info */}
              <div className="space-y-6">
                {/* Daily Hadith */}
                <section>
                  <DailyHadith hadith={hadith} loading={hadithLoading} />
                </section>

                {/* Quick Info Card */}
                <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-900/10 p-5">
                  <h4 className="text-emerald-400 font-semibold mb-3">Did You Know?</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The Prophet (ﷺ) said: &ldquo;The five daily prayers and from one Friday prayer to (the next) Friday prayer is an expiation (of the sins committed in between their intervals) if major sins are not committed.&rdquo;
                  </p>
                  <p className="mt-2 text-emerald-500/60 text-xs">— Sahih Muslim</p>
                </div>

                {/* Features List */}
                <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/40 p-5">
                  <h4 className="text-emerald-400 font-semibold mb-4">Features</h4>
                  <ul className="space-y-3">
                    {[
                      'Automatic prayer time updates',
                      'Real-time countdown timers',
                      'Daily hadith reminders',
                      'Editable prayer times',
                      'Auto-refresh at midnight'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Setup View */}
        {viewMode === 'setup' && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Prayer Time Setup</h2>
              <p className="text-slate-400">
                Edit Azan and Iqamah times for any month. Changes are saved to your browser and will persist across visits.
              </p>
            </div>
            <PrayerSetup onSave={handleSetupSave} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
