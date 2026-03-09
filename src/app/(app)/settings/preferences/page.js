'use client';

import { useTheme } from '@/contexts/theme-context';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function PreferencesPage() {
  const { theme, setTheme, themes } = useTheme();

  const themeColors = {
    purple: ['#6366f1', '#8b5cf6', '#a855f7'],
    blue: ['#3b82f6', '#0ea5e9', '#06b6d4'],
    green: ['#22c55e', '#10b981', '#14b8a6'],
    pink: ['#ec4899', '#f472b6', '#db2777'],
    orange: ['#f97316', '#fb923c', '#ea580c'],
    teal: ['#14b8a6', '#06b6d4', '#0ea5e9']
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Preferences</h1>
        <p className="text-gray-400">Customize your dashboard appearance</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Color Theme</h2>
        <p className="text-gray-400 mb-6">Choose your preferred color scheme for the entire dashboard</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(themes).map((themeKey) => (
            <button
              key={themeKey}
              onClick={() => setTheme(themeKey)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                theme === themeKey
                  ? 'border-white/40 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              {theme === themeKey && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex gap-2 mb-3">
                {themeColors[themeKey].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <div className="text-left">
                <div className="text-white font-medium">{themes[themeKey].name}</div>
                <div className="text-xs text-gray-400 capitalize">{themeKey} theme</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
        <p className="text-gray-400 mb-6">See how your selected theme looks</p>
        
        <div className="space-y-4">
          <div 
            className="p-4 rounded-lg"
            style={{
              background: `linear-gradient(135deg, rgba(var(--color-primary), 0.2), rgba(var(--color-secondary), 0.2))`
            }}
          >
            <div className="text-white font-semibold mb-2">Primary Gradient</div>
            <div className="text-gray-300 text-sm">This is how gradient backgrounds will appear</div>
          </div>
          
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{
                background: `linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
              }}
            >
              Primary Button
            </button>
            
            <button 
              className="px-4 py-2 rounded-lg border text-white font-medium"
              style={{
                borderColor: `rgba(var(--color-primary), 0.5)`,
                background: `rgba(var(--color-primary), 0.1)`
              }}
            >
              Secondary Button
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: `rgba(var(--color-primary), 0.2)`,
                  background: `rgba(var(--color-primary), 0.05)`
                }}
              >
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{
                    background: `linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {i * 1000}+
                </div>
                <div className="text-xs text-gray-400">Metric {i}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
