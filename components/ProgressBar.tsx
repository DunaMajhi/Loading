import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const springProgress = useSpring(0, { stiffness: 50, damping: 20 });
  const width = useTransform(springProgress, (value) => `${value}%`);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  useEffect(() => {
    return springProgress.on("change", (latest) => {
      setDisplayProgress(Math.floor(latest));
    });
  }, [springProgress]);

  return (
    <div className="w-full max-w-md mx-auto group select-none">
      <div className="flex justify-end mb-4">
        <span className="text-4xl font-mono font-bold text-gray-300 tabular-nums">
          {displayProgress}%
        </span>
      </div>

      <div className="relative h-1.5 bg-gray-900 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-shadow duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          style={{ width }}
        />
      </div>
    </div>
  );
};
