import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_GROUPS } from '../data';
import { Shield, Cpu, Network, GraduationCap, Award, BookOpen, Lightbulb, Quote } from 'lucide-react';

interface InteractiveAboutProps {
  isDarkMode: boolean;
}

const STATS = [
  { label: 'Projects Built', value: 4, suffix: '+' },
  { label: 'Hackathon Awards', value: 3, suffix: 'x' },
  { label: 'Skill Domains', value: 3, suffix: '' },
  { label: 'Year of Focus', value: 2026, suffix: '' },
];

function useCountUp(target: number, duration = 1200, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * ease));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, trigger]);

  return count;
}

function StatCard({ stat, idx, isDarkMode, trigger }: { stat: typeof STATS[0]; idx: number; isDarkMode: boolean; trigger: boolean }) {
  const count = useCountUp(stat.value, 1000 + idx * 200, trigger);
  const textColor = isDarkMode ? 'rgba(232,232,240,1)' : 'rgba(17,17,24,1)';
  const mutedColor = isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)';

  return (
    <div
      className="flex flex-col items-center justify-center p-5 rounded-2xl text-center"
      style={{
        background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)'}`,
      }}
    >
      <span
        className="text-3xl font-serif italic font-bold tabular-nums leading-none mb-1"
        style={{
          background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {count}{stat.suffix}
      </span>
      <span className="text-[9px] font-mono uppercase tracking-[0.16em] font-semibold" style={{ color: mutedColor }}>
        {stat.label}
      </span>
    </div>
  );
}

const categoryIcons = [
  <Shield className="h-4 w-4 text-indigo-400" />,
  <Cpu className="h-4 w-4 text-violet-400" />,
  <Network className="h-4 w-4 text-sky-400" />,
];

const categoryColors = ['#818cf8', '#a78bfa', '#38bdf8'];

export default function InteractiveAbout({ isDarkMode }: InteractiveAboutProps) {
  const [activeGroupIdx, setActiveGroupIdx] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; description: string } | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const activeGroup = SKILL_GROUPS[activeGroupIdx];
  const accentColor = categoryColors[activeGroupIdx];
  const textColor = isDarkMode ? 'rgba(232,232,240,1)' : 'rgba(17,17,24,1)';
  const mutedColor = isDarkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-28 relative"
      style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}
    >
      {/* Ambient orb */}
      <div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.07), transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-[10px] uppercase font-mono tracking-[0.22em] font-bold" style={{ color: '#6366f1' }}>
          About Me
        </span>
      </div>
      <h2
        className="text-4xl md:text-5xl font-serif italic font-semibold tracking-tighter mb-14"
        style={{ color: textColor }}
      >
        About & Skills
      </h2>

      <div className="grid lg:grid-cols-12 gap-10 items-start relative z-10">

        {/* ── Left column ── */}
        <div className="lg:col-span-7 space-y-6">

          {/* Bio card */}
          <div
            className="p-8 md:p-10 rounded-2xl"
            style={{
              background: isDarkMode ? 'rgba(15,17,30,0.6)' : 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)'}`,
            }}
          >
            {/* Decorative left border gradient */}
            <div
              className="flex gap-6"
              style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg, #6366f1, #38bdf8) 1' }}
            >
              <div className="pl-5 space-y-4 text-base font-light leading-relaxed" style={{ color: mutedColor }}>
                <p>
                  Hello, I'm{' '}
                  <strong className="font-semibold" style={{ color: textColor }}>Dilip Gowda S</strong>
                  {' '}— a cybersecurity specialist and tech founder constructing the future of immune, intelligent architectures.
                </p>
                <p>
                  My drive lies in the convergence of{' '}
                  <strong
                    className="font-semibold"
                    style={{
                      background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    robust security networks
                  </strong>
                  {' '}and{' '}
                  <strong
                    className="font-semibold"
                    style={{
                      background: 'linear-gradient(90deg, #38bdf8, #34d399)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    applied agentic AI
                  </strong>
                  {' '}— bridging abstract algorithms with hardened, production-ready software.
                </p>
                <p>
                  As an active researcher, I explore deep optimization within human-computer interactions, hospital workflows, and machine learning structures.
                </p>
              </div>
            </div>

            {/* Quick facts */}
            <div
              className="grid grid-cols-3 gap-4 pt-7 mt-7"
              style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
            >
              {[
                { Icon: GraduationCap, label: 'STATUS', value: 'Security Scholar' },
                { Icon: Award, label: 'HACKATHONS', value: '3x Awardee' },
                { Icon: BookOpen, label: 'FOCUS', value: 'Applied AI & Edge' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ background: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)' }}
                  >
                    <Icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-mono text-slate-400 font-bold tracking-wider">{label}</span>
                    <span className="text-[11px] font-semibold" style={{ color: textColor }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat, idx) => (
              <StatCard key={stat.label} stat={stat} idx={idx} isDarkMode={isDarkMode} trigger={statsVisible} />
            ))}
          </div>

          {/* Philosophy quote */}
          <div
            className="p-6 rounded-2xl relative overflow-hidden"
            style={{
              background: isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
            }}
          >
            <Quote className="h-6 w-6 mb-3 opacity-30" style={{ color: '#6366f1' }} />
            <p className="text-sm font-light italic leading-relaxed" style={{ color: mutedColor }}>
              "We must build defensive systems by design, not by patch. An AI system that leaks data or lacks proper segmentation is a liability. I build boundaries and integrations that protect user privacy."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
              <span className="text-[9px] font-mono uppercase tracking-widest font-bold" style={{ color: '#6366f1' }}>
                Philosophy
              </span>
            </div>
          </div>
        </div>

        {/* ── Right column: Skills ── */}
        <div
          className="lg:col-span-5 p-7 rounded-2xl flex flex-col"
          style={{
            background: isDarkMode ? 'rgba(15,17,30,0.5)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(24px)',
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase" style={{ color: textColor }}>
              Skills
            </span>
            <span
              className="text-[9px] font-mono px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
              style={{
                background: `${accentColor}15`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
                transition: 'all 0.3s ease',
              }}
            >
              Interactive
            </span>
          </div>

          {/* Category tabs */}
          <div
            className="flex gap-2 mb-8 p-1 rounded-xl"
            style={{ background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
          >
            {SKILL_GROUPS.map((grp, idx) => {
              const isActive = activeGroupIdx === idx;
              const shortName = grp.category.split(' ')[0];
              return (
                <button
                  key={grp.category}
                  onClick={() => { setActiveGroupIdx(idx); setHoveredSkill(null); }}
                  className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer focus:outline-none"
                  style={{
                    background: isActive
                      ? isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)'
                      : 'transparent',
                    color: isActive ? categoryColors[idx] : mutedColor,
                    boxShadow: isActive ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  {categoryIcons[idx]}
                  <span className="hidden sm:inline">{shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Skill bars */}
          <div className="space-y-4 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroupIdx}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="space-y-4"
              >
                {activeGroup.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={(e) => { setHoveredSkill(skill); (e.currentTarget as HTMLElement).style.background = isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}30`; }}
                    onMouseLeave={(e) => { setHoveredSkill(null); (e.currentTarget as HTMLElement).style.background = isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'; (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'; }}
                    className="group cursor-help p-4 rounded-xl transition-all duration-200"
                    style={{
                      border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      background: isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                    }}
                  >

                    <div className="flex justify-between items-center mb-2.5">
                      <span
                        className="text-xs font-semibold transition-colors duration-200"
                        style={{ color: textColor }}
                      >
                        {skill.name}
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-wider" style={{ color: accentColor }}>
                        {skill.proficiency}%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div
                      className="relative h-1.5 w-full rounded-full overflow-hidden"
                      style={{ background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                    >
                      <motion.div
                        className="absolute h-full left-0 top-0 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
                          boxShadow: `0 0 8px ${accentColor}40`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Skill tooltip */}
          <div
            className="mt-6 pt-5"
            style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
          >
            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl"
                  style={{
                    background: isDarkMode ? `${accentColor}10` : `${accentColor}08`,
                    border: `1px solid ${accentColor}25`,
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb className="h-3 w-3 animate-pulse" style={{ color: accentColor }} />
                    <span className="text-[9px] uppercase font-mono font-bold tracking-widest" style={{ color: accentColor }}>
                      {hoveredSkill.name}
                    </span>
                  </div>
                  <p className="text-xs font-light leading-relaxed" style={{ color: mutedColor }}>
                    {hoveredSkill.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[10px] uppercase font-mono tracking-widest py-4 rounded-xl"
                  style={{
                    color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)',
                    border: `1px dashed ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
                  }}
                >
                  ✦ Hover a skill for details ✦
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
