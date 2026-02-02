import { useState, useEffect } from 'react';
import { DEFAULT_IQAMAH_DELAYS } from '@/data/prayerData';
import { Settings2, Clock, RotateCcw, Save, Moon, Sun, CloudSun, Sunset, MoonStar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface IqamahSettingsProps {
  onSave: (delays: typeof DEFAULT_IQAMAH_DELAYS) => void;
  currentDelays: typeof DEFAULT_IQAMAH_DELAYS;
}

const prayerConfig = [
  { key: 'fajr', label: 'Fajr', icon: Moon, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20' },
  { key: 'dhuhr', label: 'Dhuhr', icon: Sun, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
  { key: 'asr', label: 'Asr', icon: CloudSun, color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  { key: 'maghrib', label: 'Maghrib', icon: Sunset, color: 'text-rose-400', bgColor: 'bg-rose-500/20' },
  { key: 'isha', label: 'Isha', icon: MoonStar, color: 'text-violet-400', bgColor: 'bg-violet-500/20' }
] as const;

export function IqamahSettings({ onSave, currentDelays }: IqamahSettingsProps) {
  const [delays, setDelays] = useState(currentDelays);

  useEffect(() => {
    setDelays(currentDelays);
  }, [currentDelays]);

  const handleChange = (key: keyof typeof DEFAULT_IQAMAH_DELAYS, value: string) => {
    const numValue = parseInt(value) || 0;
    setDelays(prev => ({ ...prev, [key]: numValue }));
  };

  const handleSave = () => {
    onSave(delays);
    toast.success('Iqamah settings saved successfully!', {
      description: 'Your prayer time delays have been updated.',
    });
  };

  const handleReset = () => {
    setDelays(DEFAULT_IQAMAH_DELAYS);
    onSave(DEFAULT_IQAMAH_DELAYS);
    toast.info('Settings reset to defaults', {
      description: 'Iqamah delays have been restored to default values.',
    });
  };

  return (
    <div className="w-full rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-950/60 to-emerald-950/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-emerald-500/20 bg-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-emerald-400 font-semibold">Iqamah Settings</h3>
            <p className="text-emerald-500/70 text-xs">Configure prayer delay times</p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="p-5 space-y-4">
        {prayerConfig.map(({ key, label, icon: Icon, color, bgColor }) => (
          <div 
            key={key}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-slate-200 font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                <Input
                  type="number"
                  min="0"
                  max="60"
                  value={delays[key as keyof typeof delays]}
                  onChange={(e) => handleChange(key as keyof typeof delays, e.target.value)}
                  className="w-24 pl-9 pr-8 bg-slate-950/60 border-emerald-500/30 text-emerald-400 font-mono focus:border-emerald-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500/60">min</span>
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-emerald-500/20">
          <Button
            onClick={handleSave}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
