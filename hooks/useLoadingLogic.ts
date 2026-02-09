import { useState, useEffect } from 'react';

export const useLoadingLogic = (mode: 'midnight' | 'morning' | 'normal' = 'normal') => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initial random value 5-20%
    // Wrapped in setTimeout to avoid synchronous state update warning
    const t = setTimeout(() => {
      setProgress(Math.floor(Math.random() * 15) + 5);
    }, 0);
    return () => clearTimeout(t);
  }, []); // Run only once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Hard cap at 97%
        if (prev >= 97) return 97;

        const random = Math.random();
        let change = 0;

        // Speed modifier based on mode
        let speedMultiplier = 1;
        if (mode === 'midnight') speedMultiplier = 1.5; // Faster
        if (mode === 'morning') speedMultiplier = 0.5; // Slower

        if (random < 0.1) {
          // Pause (10% chance)
          change = 0;
        } else if (random < 0.2) {
          // Drop by 1-5% (10% chance)
          change = -(Math.random() * 4 + 1);
        } else if (random < 0.3) {
          // Jump forward by 2-7% (10% chance)
          change = (Math.random() * 5 + 2) * speedMultiplier;
        } else {
          // Increase slowly (70% chance)
          change = (Math.random() * 0.5 + 0.1) * speedMultiplier;
        }

        let next = prev + change;

        // Boundaries
        if (next < 0) next = 0;
        if (next > 97) next = 97;

        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [mode]);

  return progress;
};
