import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HACKATHONS, RESEARCH_AREAS } from '../data';
import { HackathonMilestone, ResearchArea } from '../types';
import { Trophy, Calendar, CheckCircle2, FlaskConical, Rocket, Target, ArrowUpRight } from 'lucide-react';

interface JourneyTimelineProps {
  isDarkMode: boolean;
}

const AWARD_COLORS: Record<string, string> = {
  '🏆': '#f59e0b',
  '🌟': '#818cf8',
  '💡': '#34d399',
};

const RESEARCH_COLORS = ['#6366f1', '#a78bfa', '#38bdf8', '#34d399'];

export default function JourneyTimeline({ isDarkMode }: JourneyTimelineProps) {
  const [selectedHackIdx, setSelectedHackIdx] = useState<number>(0);
  const [selectedResearchId, setSelectedResearchId] = useState<string>('cybersec');

  const activeHack: HackathonMilestone = HACKATHONS[selectedHackIdx];
  const activeResearch: ResearchArea = RESEARCH_AREAS.find((r) => r.id === selectedResearchId) || RESEARCH_AREAS[0];
  const activeResearchColor = RESEARCH_COLORS[RESEARCH_AREAS.findIndex((r) => r.id === selectedResearchId)] || '#6366f1';

  const textColor = isDarkMode ? 'rgba(232,232,240,1)' : 'rgba(17,17,24,1)';
  const mutedColor = isDarkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)';

  return (
    <section
      id="journey"
      className="py-28 relative"
      style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}
    >
      {/* Ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04), transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="grid lg:grid-cols-2 gap-14 relative z-10">

        {/* ── LEFT: Hackathon Timeline ── */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Rocket className="h-4 w-4 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-[0.22em] font-bold" style={{ color: '#6366f1' }}>
              Achievements
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-serif italic font-semibold tracking-tighter mb-3"
            style={{ color: textColor }}
          >
            Hackathons
          </h2>
          <p className="text-sm font-light leading-relaxed mb-10" style={{ color: mutedColor }}>
            Intense 36–48 hour sprints yielding awards, pilot deployments, and early research support.
          </p>

          {/* Timeline */}
          <div className="relative pl-10 space-y-0">
            {/* Gradient vertical line */}
            <div
              className="absolute left-3 top-3 bottom-3 w-px"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(180deg, rgba(99,102,241,0.6), rgba(56,189,248,0.3), rgba(99,102,241,0.1))'
                  : 'linear-gradient(180deg, rgba(99,102,241,0.4), rgba(56,189,248,0.2), rgba(99,102,241,0.05))',
              }}
            />

            {HACKATHONS.map((h, idx) => {
              const isSelected = selectedHackIdx === idx;
              const awardEmoji = h.award?.charAt(0) || '🏆';
              const awardColor = AWARD_COLORS[awardEmoji] || '#818cf8';

              return (
                <div key={h.id} className="relative pb-8 last:pb-0">
                  {/* Timeline node */}
                  <button
                    onClick={() => setSelectedHackIdx(idx)}
                    className="absolute -left-7 top-4 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none z-10"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${awardColor}, ${awardColor}90)`
                        : isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                      border: isSelected
                        ? `2px solid ${awardColor}`
                        : `2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      boxShadow: isSelected ? `0 0 16px ${awardColor}50` : 'none',
                      transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    }}
                  >
                    <Trophy className="h-3 w-3" style={{ color: isSelected ? 'white' : mutedColor }} />
                    {isSelected && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: `${awardColor}30`, animationDuration: '1.5s' }}
                      />
                    )}
                  </button>

                  {/* Card */}
                  <div
                    onClick={() => setSelectedHackIdx(idx)}
                    className="p-6 rounded-2xl cursor-pointer transition-all duration-300"
                    style={{
                      background: isSelected
                        ? isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)'
                        : isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                      border: isSelected
                        ? `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`
                        : `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLDivElement).style.background = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLDivElement).style.background = isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)';
                      }
                    }}
                  >
                    {/* Meta row */}
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <span
                        className="text-[9px] font-mono font-bold flex items-center gap-1.5 uppercase tracking-widest"
                        style={{ color: mutedColor }}
                      >
                        <Calendar className="h-3 w-3" /> {h.year} · {h.event}
                      </span>
                      {h.award && (
                        <span
                          className="text-[9px] font-mono font-bold px-3 py-1 rounded-full"
                          style={{
                            background: `${awardColor}15`,
                            color: awardColor,
                            border: `1px solid ${awardColor}30`,
                          }}
                        >
                          {h.award}
                        </span>
                      )}
                    </div>

                    <h4
                      className="text-base font-serif italic font-semibold mb-2 transition-colors duration-200"
                      style={{ color: textColor }}
                    >
                      {h.title}
                    </h4>
                    <p className="text-xs font-light leading-relaxed" style={{ color: mutedColor }}>
                      {h.description}
                    </p>

                    {/* Expanding outcomes */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mt-5 pt-5"
                            style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
                          >
                            <h5
                              className="text-[9px] uppercase font-mono tracking-widest font-bold mb-3 flex items-center gap-1.5"
                              style={{ color: '#6366f1' }}
                            >
                              <Target className="h-3 w-3" /> Outcomes
                            </h5>
                            <ul className="space-y-2 mb-4">
                              {h.outcomes.map((o, i) => (
                                <li key={i} className="text-xs font-light flex gap-2.5" style={{ color: mutedColor }}>
                                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                  <span>{o}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs italic font-light leading-relaxed" style={{ color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>
                              {h.extendedDescription}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Research Frontiers ── */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <FlaskConical className="h-4 w-4 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-[0.22em] font-bold" style={{ color: '#6366f1' }}>
              Research
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-serif italic font-semibold tracking-tighter mb-3"
            style={{ color: textColor }}
          >
            Research Areas
          </h2>
          <p className="text-sm font-light leading-relaxed mb-10" style={{ color: mutedColor }}>
            Active deep dives examining security postures and interfaces built to deliver universal cognitive equity.
          </p>

          {/* Research grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {RESEARCH_AREAS.map((res, idx) => {
              const isActive = selectedResearchId === res.id;
              const color = RESEARCH_COLORS[idx];
              return (
                <button
                  key={res.id}
                  onClick={() => setSelectedResearchId(res.id)}
                  className="p-5 rounded-2xl text-left transition-all duration-250 cursor-pointer focus:outline-none"
                  style={{
                    background: isActive
                      ? isDarkMode ? `${color}12` : `${color}08`
                      : isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: isActive
                      ? `1px solid ${color}40`
                      : `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    transform: isActive ? 'scale(1.01)' : 'scale(1)',
                    boxShadow: isActive ? `0 8px 24px ${color}12` : 'none',
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      {res.emoji}
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200"
                      style={{
                        color: isActive ? color : mutedColor,
                        transform: isActive ? 'translate(2px, -2px)' : 'none',
                      }}
                    />
                  </div>
                  <h4
                    className="text-sm font-serif italic font-semibold tracking-tight leading-tight"
                    style={{ color: isActive ? color : textColor }}
                  >
                    {res.title.split(' & ')[0]}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active research details */}
          <div
            className="p-7 rounded-2xl"
            style={{
              background: isDarkMode ? 'rgba(15,17,30,0.6)' : 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
              minHeight: '280px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeResearch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `${activeResearchColor}15`,
                      border: `1px solid ${activeResearchColor}30`,
                    }}
                  >
                    {activeResearch.emoji}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-serif italic font-semibold mb-1"
                      style={{ color: textColor }}
                    >
                      {activeResearch.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: mutedColor }}>
                      {activeResearch.fullDetails}
                    </p>
                  </div>
                </div>

                <div>
                  <h5
                    className="text-[9px] uppercase font-mono tracking-widest font-bold mb-3"
                    style={{ color: activeResearchColor }}
                  >
                    Focus Areas
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeResearch.subfields.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-mono px-3 py-1.5 rounded-full uppercase font-semibold"
                        style={{
                          background: `${activeResearchColor}10`,
                          color: activeResearchColor,
                          border: `1px solid ${activeResearchColor}25`,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
