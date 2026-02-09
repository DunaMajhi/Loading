import { useState, useEffect } from 'react';

export const useTimeBasedEasterEggs = () => {
  const [mode, setMode] = useState<'midnight' | 'morning' | 'normal'>('normal');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 5) {
        setMode('midnight');
        setMessage("Late night clarity detected.");
      } else if (hour >= 5 && hour < 9) {
        setMode('morning');
        setMessage("Running on low motivation.");
      } else {
        setMode('normal');
        setMessage(null);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return { mode, message };
};
