import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  '> Loading portfolio...',
  '> Initializing components...',
  '> Fetching project data...',
  '> Rendering interface...',
  '> Applying styles...',
  '> Almost ready...',
  '> Welcome.',
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([BOOT_LOGS[0]]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const intervalTime = 18;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const noise = 1 + Math.random() * 0.6;
        const next = prev + step * noise;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 700);
      }, 400);
    }
  }, [progress, onComplete]);

  useEffect(() => {
    const targetIdx = Math.min(
      BOOT_LOGS.length - 1,
      Math.floor((progress / 100) * BOOT_LOGS.length)
    );
    if (targetIdx !== currentLogIdx) {
      setCurrentLogIdx(targetIdx);
      setVisibleLogs((prev) => {
        const updated = [...prev, BOOT_LOGS[targetIdx]];
        return updated.length > 4 ? updated.slice(updated.length - 4) : updated;
      });
    }
  }, [progress, currentLogIdx]);

  const displayProgress = Math.min(100, Math.floor(progress));

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loader"
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-16 bg-[#050810] text-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient background orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

          {/* Top status bar */}
          <motion.div
            className="flex justify-between items-center text-[10px] font-mono text-white/40 font-medium tracking-[0.18em] relative z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span>DILIP GOWDA S // NEURAL PORTFOLIO</span>
            <span className="text-indigo-400">STATUS: BOOT_SEQUENCE_ACTIVE</span>
          </motion.div>

          {/* Center: Ring animation + brand mark */}
          <div className="flex flex-col items-center justify-center my-auto relative z-10">
            
            {/* Animated ring system */}
            <div className="relative flex items-center justify-center w-48 h-48">
              
              {/* Outermost ring — slow clockwise */}
              <motion.div
                className="absolute inset-0"
                style={{ 
                  border: '1px solid transparent',
                  borderTopColor: 'rgba(99,102,241,0.5)',
                  borderRightColor: 'rgba(99,102,241,0.15)',
                  borderRadius: '50%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Second ring — counter-clockwise, faster */}
              <motion.div
                className="absolute"
                style={{
                  inset: '12px',
                  border: '1px solid transparent',
                  borderBottomColor: 'rgba(129,140,248,0.6)',
                  borderLeftColor: 'rgba(129,140,248,0.2)',
                  borderRadius: '50%'
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Third inner ring — medium */}
              <motion.div
                className="absolute"
                style={{
                  inset: '28px',
                  border: '1px solid transparent',
                  borderTopColor: 'rgba(56,189,248,0.4)',
                  borderRightColor: 'rgba(56,189,248,0.1)',
                  borderRadius: '50%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Core brand mark */}
              <motion.div
                className="relative flex items-center justify-center w-24 h-24 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle at 40% 40%, rgba(99,102,241,0.15), rgba(5,8,16,0.95))',
                  border: '1px solid rgba(99,102,241,0.25)',
                  boxShadow: '0 0 30px rgba(99,102,241,0.2), inset 0 0 20px rgba(99,102,241,0.05)'
                }}
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(99,102,241,0.2), inset 0 0 20px rgba(99,102,241,0.05)',
                    '0 0 50px rgba(99,102,241,0.4), inset 0 0 30px rgba(99,102,241,0.1)',
                    '0 0 30px rgba(99,102,241,0.2), inset 0 0 20px rgba(99,102,241,0.05)',
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-2xl font-serif italic font-semibold tracking-widest bg-gradient-to-br from-indigo-300 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  DG
                </span>
              </motion.div>
            </div>

            {/* Progress percentage */}
            <motion.div
              className="mt-10 text-6xl font-serif italic font-light tracking-tighter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-white">{displayProgress}</span>
              <span className="text-2xl text-indigo-400 font-mono font-bold ml-1">%</span>
            </motion.div>
          </div>

          {/* Bottom: Terminal logs + progress bar */}
          <div className="max-w-xl mx-auto w-full relative z-10">
            
            {/* Terminal log stream */}
            <div className="h-24 flex flex-col justify-end overflow-hidden mb-6">
              <div className="space-y-1">
                {visibleLogs.map((log, index) => {
                  const isLast = index === visibleLogs.length - 1;
                  return (
                    <motion.div
                      key={log}
                      className={`font-mono text-[10px] font-medium tracking-wider ${
                        isLast
                          ? 'text-indigo-400'
                          : 'text-white/25'
                      }`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {log}
                      {isLast && progress < 100 && (
                        <span className="cursor-blink ml-1 text-indigo-400">▊</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Progress track */}
            <div className="relative h-[2px] w-full bg-white/8 rounded-full overflow-hidden">
              {/* Filled portion */}
              <motion.div
                className="absolute h-full left-0 top-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #818cf8, #38bdf8)',
                  width: `${progress}%`,
                  transition: 'width 0.1s linear',
                }}
              />
              {/* Shimmer traveling highlight */}
              <div
                className="absolute h-full top-0 w-24 rounded-full"
                style={{
                  left: `${Math.max(0, progress - 12)}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  transition: 'left 0.1s linear',
                }}
              />
            </div>

            <div className="flex justify-between mt-2 text-[9px] font-mono text-white/25 tracking-widest uppercase">
              <span>BOOT_INIT</span>
              <span>SYSTEM_READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
