'use client';

import { useState, useEffect } from 'react';
import { useLoadingLogic } from '../hooks/useLoadingLogic';
import { useTimeBasedEasterEggs } from '../hooks/useTimeBasedEasterEggs';
import { ProgressBar } from './ProgressBar';
import { StatusMessage } from './StatusMessage';

export default function LoadingScreen() {
  const { mode, message: timeMessage } = useTimeBasedEasterEggs();
  const progress = useLoadingLogic(mode);

  // Rage click logic
  const [rageMessage, setRageMessage] = useState<string | null>(null);
  const [clicks, setClicks] = useState<number[]>([]);

  const handleClick = () => {
    const now = Date.now();
    setClicks(prev => {
      // Keep clicks within the last 1 second
      const recent = prev.filter(t => now - t < 1000);
      return [...recent, now];
    });
  };

  useEffect(() => {
    if (clicks.length >= 5) {
      // Defer state update to avoid synchronous warning
      const t = setTimeout(() => {
        setRageMessage("Relax. This won’t speed it up.");
        setTimeout(() => setRageMessage(null), 3000);
        setClicks([]); // Reset
      }, 0);
      return () => clearTimeout(t);
    }
  }, [clicks]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden grain cursor-default select-none"
      onClick={handleClick}
    >
      <div className="w-full max-w-lg z-10 flex flex-col items-center justify-center space-y-12">
        <div className="space-y-2 w-full text-center">
           <h1 className="text-sm font-mono text-gray-600 uppercase tracking-widest">Life Loading Simulator</h1>
        </div>

        <div className="w-full">
            <ProgressBar progress={progress} />
        </div>

        <div className="w-full">
            <StatusMessage overrideMessage={rageMessage || timeMessage} />
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] text-gray-800 font-mono opacity-50">
        v1.0.0
      </div>
    </div>
  );
}
