import { useState, useEffect } from 'react';
import { Calendar, Save, RotateCcw, ChevronLeft, ChevronRight, Volume2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { PRAYER_DATA, IQAMAH_DATA } from '@/data/prayerData';

interface PrayerSetupProps {
  onSave: () => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

export function PrayerSetup({ onSave }: PrayerSetupProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [prayerData, setPrayerData] = useState<Record<string, Record<string, string>>>({});
  const [iqamahData, setIqamahData] = useState<Record<string, Record<string, string>>>({});
  const [activeTab, setActiveTab] = useState<'azan' | 'iqamah'>('azan');

  // Load data from localStorage or use defaults
  useEffect(() => {
    const savedPrayer = localStorage.getItem('prayerData');
    const savedIqamah = localStorage.getItem('iqamahData');
    
    setPrayerData(savedPrayer ? JSON.parse(savedPrayer) : { ...PRAYER_DATA });
    setIqamahData(savedIqamah ? JSON.parse(savedIqamah) : { ...IQAMAH_DATA });
  }, []);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDateKey = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getPrayerTime = (day: number, prayer: string) => {
    const key = getDateKey(day);
    const data = activeTab === 'azan' ? prayerData : iqamahData;
    const defaultData = activeTab === 'azan' ? PRAYER_DATA : IQAMAH_DATA;
    
    if (data[key] && data[key][prayer]) {
      return data[key][prayer];
    }
    if (defaultData[key] && defaultData[key][prayer as keyof typeof defaultData[string]]) {
      return defaultData[key][prayer as keyof typeof defaultData[string]];
    }
    // Find closest earlier date
    const keys = Object.keys(defaultData).sort();
    for (let i = keys.length - 1; i >= 0; i--) {
      if (keys[i] <= key) {
        return defaultData[keys[i]][prayer as keyof typeof defaultData[string]];
      }
    }
    return '--:--';
  };

  const handleTimeChange = (day: number, prayer: string, value: string) => {
    const key = getDateKey(day);
    
    if (activeTab === 'azan') {
      setPrayerData(prev => ({
        ...prev,
        [key]: { ...prev[key], [prayer]: value }
      }));
    } else {
      setIqamahData(prev => ({
        ...prev,
        [key]: { ...prev[key], [prayer]: value }
      }));
    }
  };

  const handleSave = () => {
    localStorage.setItem('prayerData', JSON.stringify(prayerData));
    localStorage.setItem('iqamahData', JSON.stringify(iqamahData));
    toast.success('Prayer times saved successfully!', {
      description: `Updated ${activeTab === 'azan' ? 'Azan' : 'Iqamah'} times for ${months[currentMonth]} ${currentYear}`,
    });
    onSave();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes? This will restore the default prayer times.')) {
      localStorage.removeItem('prayerData');
      localStorage.removeItem('iqamahData');
      setPrayerData({ ...PRAYER_DATA });
      setIqamahData({ ...IQAMAH_DATA });
      toast.info('Prayer times reset to defaults');
      onSave();
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const prayerLabels: Record<string, string> = {
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha'
  };

  return (
    <div className="w-full rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-950/60 to-emerald-950/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-emerald-500/20 bg-emerald-500/10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold">Prayer Time Setup</h3>
              <p className="text-emerald-500/70 text-xs">Edit Azan and Iqamah timings</p>
            </div>
          </div>
          
          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 rounded-lg bg-slate-950/60 text-emerald-400 font-medium min-w-[140px] text-center">
              {months[currentMonth]} {currentYear}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-4">
          <Button
            variant={activeTab === 'azan' ? 'default' : 'outline'}
            onClick={() => setActiveTab('azan')}
            className={`flex-1 ${activeTab === 'azan' ? 'bg-amber-500 text-slate-950' : 'border-amber-500/30 text-amber-400'}`}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Azan Times
          </Button>
          <Button
            variant={activeTab === 'iqamah' ? 'default' : 'outline'}
            onClick={() => setActiveTab('iqamah')}
            className={`flex-1 ${activeTab === 'iqamah' ? 'bg-cyan-500 text-slate-950' : 'border-cyan-500/30 text-cyan-400'}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Iqamah Times
          </Button>
        </div>
      </div>

      {/* Prayer Times Table */}
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="text-emerald-400 font-semibold text-sm p-2">Day</div>
            {prayers.map(prayer => (
              <div key={prayer} className={`font-semibold text-sm p-2 text-center ${
                activeTab === 'azan' ? 'text-amber-400' : 'text-cyan-400'
              }`}>
                {prayerLabels[prayer]}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <div 
                key={day} 
                className="grid grid-cols-6 gap-2 items-center p-1 rounded hover:bg-emerald-500/5"
              >
                <div className="text-slate-300 font-medium text-sm p-2">
                  {day}
                </div>
                {prayers.map(prayer => (
                  <div key={prayer} className="p-1">
                    <Input
                      type="time"
                      value={getPrayerTime(day, prayer)}
                      onChange={(e) => handleTimeChange(day, prayer, e.target.value)}
                      className={`text-center font-mono text-sm ${
                        activeTab === 'azan' 
                          ? 'border-amber-500/30 text-amber-400 focus:border-amber-500' 
                          : 'border-cyan-500/30 text-cyan-400 focus:border-cyan-500'
                      } bg-slate-950/60`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-4 border-t border-emerald-500/20 bg-emerald-500/5 flex gap-3">
        <Button
          onClick={handleSave}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset All
        </Button>
      </div>
    </div>
  );
}
