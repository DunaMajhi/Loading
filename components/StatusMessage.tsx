import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Life is loading…",
  "Still figuring things out…",
  "Unexpected delay encountered.",
  "Retrying…",
  "Almost there.",
  "This might take a while.",
  "Optimizing decisions…",
  "Waiting for the right moment.",
  "Calculating potential regrets...",
  "Buffering existential dread...",
  "Loading… please wait.",
  "Connection to reality unstable...",
  "Syncing with the universe...",
  "Analyzing life choices...",
  "Defragmenting memories...",
  "Searching for meaning...",
  "Updating purpose...",
  "Revisiting past mistakes...",
  "Simulating potential futures...",
  "Compiling excuses...",
  "Rendering disappointment...",
  "Establishing connection to self..."
];

interface StatusMessageProps {
  overrideMessage?: string | null;
}

export const StatusMessage = ({ overrideMessage }: StatusMessageProps) => {
  const [rotatingMessage, setRotatingMessage] = useState(messages[0]);

  useEffect(() => {
    if (overrideMessage) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setRotatingMessage(messages[randomIndex]);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [overrideMessage]);

  const displayMessage = overrideMessage || rotatingMessage;

  return (
    <div className="h-8 flex items-center justify-center mt-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={displayMessage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 text-sm font-mono text-center"
        >
          {displayMessage}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
