import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { ArrowUpRight, Github, CheckCircle2, X, Search, Layers, Shield, Cpu, Lightbulb } from 'lucide-react';

interface ProjectGridProps {
  isDarkMode: boolean;
}

const CATEGORY_META: Record<string, { icon: typeof Layers; color: string; gradient: string }> = {
  'AI & Systems':                { icon: Cpu,       color: '#818cf8', gradient: 'from-indigo-500/20 to-violet-500/20' },
  'Cyber Security & Networks':   { icon: Shield,    color: '#34d399', gradient: 'from-emerald-500/20 to-teal-500/20' },
  'Innovative Tech':             { icon: Lightbulb, color: '#f59e0b', gradient: 'from-amber-500/20 to-orange-500/20' },
};

export default function ProjectGrid({ isDarkMode }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'AI & Systems', 'Cyber Security & Networks', 'Innovative Tech'];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const textColor = isDarkMode ? 'rgba(232,232,240,1)' : 'rgba(17,17,24,1)';
  const mutedColor = isDarkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)';

  return (
    <section id="projects" className="py-28 relative" style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}>
      
      {/* Background ambient */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-[0.22em] font-bold" style={{ color: '#6366f1' }}>
              Selected Work
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-serif italic font-semibold tracking-tighter mb-3"
            style={{ color: textColor }}
          >
            Projects
          </h2>
          <p className="text-base font-light leading-relaxed max-w-lg" style={{ color: mutedColor }}>
            Ecosystem solutions and defensive architectures pushing the limits of security, automation, and healthcare.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: mutedColor }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs rounded-xl font-mono placeholder-current focus:outline-none transition-all duration-200"
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              color: textColor,
              '--tw-placeholder-color': mutedColor,
            } as React.CSSProperties}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'; }}
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-12 relative z-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="relative px-5 py-2.5 text-[11px] font-semibold font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap rounded-full focus:outline-none"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, #6366f1, #818cf8)'
                  : isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                border: isActive
                  ? '1px solid transparent'
                  : `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                color: isActive ? 'white' : mutedColor,
                boxShadow: isActive ? '0 4px 20px rgba(99,102,241,0.35)' : 'none',
                transform: isActive ? 'translateY(-1px)' : 'none',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Bento project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const meta = CATEGORY_META[project.category] || CATEGORY_META['AI & Systems'];
            const Icon = meta.icon;
            const isFeatured = index === 0 && selectedCategory === 'All' && !searchQuery;

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveProject(project)}
                className={`group relative flex flex-col justify-between p-7 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{
                  background: isDarkMode
                    ? 'rgba(15, 17, 30, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(24px)',
                  border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)'}`,
                  boxShadow: isDarkMode
                    ? '0 4px 24px rgba(0,0,0,0.3)'
                    : '0 4px 24px rgba(0,0,0,0.06)',
                  minHeight: isFeatured ? '280px' : '260px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${meta.color}50`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${meta.color}18`
                    : `0 20px 40px rgba(0,0,0,0.1), 0 0 20px ${meta.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.06)';
                }}
              >
                {/* Subtle top gradient accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
                />

                {/* Card content */}
                <div>
                  <div className="flex justify-between items-start mb-5">
                    {/* Category icon */}
                    <div
                      className="flex items-center justify-center h-11 w-11 rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: isDarkMode
                          ? `rgba(${parseInt(meta.color.slice(1,3), 16)}, ${parseInt(meta.color.slice(3,5), 16)}, ${parseInt(meta.color.slice(5,7), 16)}, 0.15)`
                          : `rgba(${parseInt(meta.color.slice(1,3), 16)}, ${parseInt(meta.color.slice(3,5), 16)}, ${parseInt(meta.color.slice(5,7), 16)}, 0.1)`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: meta.color }} />
                    </div>

                    {/* Category label */}
                    <span
                      className="text-[9px] font-mono tracking-[0.14em] uppercase px-3 py-1.5 rounded-full font-bold"
                      style={{
                        background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: mutedColor,
                      }}
                    >
                      {project.category.split(' ')[0]}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-serif italic font-semibold mb-3 transition-colors duration-200"
                    style={{ color: textColor }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = meta.color; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = textColor; }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed line-clamp-3" style={{ color: mutedColor }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5 mb-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          background: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)',
                          color: '#818cf8',
                          border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)'}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className="text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(99,102,241,0.08)',
                          color: '#a78bfa',
                        }}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer action */}
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
                  >
                    <span
                      className="text-[11px] font-mono font-bold tracking-widest uppercase transition-transform duration-200 group-hover:translate-x-1.5 inline-flex items-center gap-1.5"
                      style={{ color: meta.color }}
                    >
                      View Details <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                    {project.githubUrl && (
                      <span
                        className="transition-colors duration-200"
                        style={{ color: mutedColor }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = textColor; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = mutedColor; }}
                      >
                        <Github className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div
            className="col-span-full text-center py-20 rounded-2xl"
            style={{
              border: `1px dashed ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <Layers className="h-10 w-10 mx-auto mb-3 animate-pulse" style={{ color: 'rgba(99,102,241,0.4)' }} />
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: mutedColor }}>
              No projects match your filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-6 py-2.5 text-white font-mono text-[10px] tracking-widest uppercase rounded-full cursor-pointer transition-all btn-shimmer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ═══ CASE STUDY DRAWER ═══ */}
      <AnimatePresence>
        {activeProject && (() => {
          const meta = CATEGORY_META[activeProject.category] || CATEGORY_META['AI & Systems'];
          const Icon = meta.icon;
          return (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 z-[100] cursor-zoom-out"
                style={{ background: isDarkMode ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)' }}
              />

              {/* Slide-over panel */}
              <motion.div
                ref={drawerRef}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-xl z-[101] overflow-y-auto p-8 md:p-12"
                style={{
                  background: isDarkMode ? '#0a0c16' : '#FAFAFA',
                  borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  boxShadow: '-40px 0 100px rgba(0,0,0,0.5)',
                  color: textColor,
                }}
              >
                {/* Drawer header */}
                <div
                  className="flex justify-between items-center pb-6 mb-8"
                  style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: meta.color }} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em]" style={{ color: meta.color }}>
                      Project Details
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="p-2 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none"
                    style={{
                      background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Project title block */}
                <div className="flex items-start gap-5 mb-7">
                  <div
                    className="flex items-center justify-center h-14 w-14 rounded-2xl flex-shrink-0"
                    style={{
                      background: isDarkMode
                        ? `rgba(${parseInt(meta.color.slice(1,3), 16)}, ${parseInt(meta.color.slice(3,5), 16)}, ${parseInt(meta.color.slice(5,7), 16)}, 0.15)`
                        : `rgba(${parseInt(meta.color.slice(1,3), 16)}, ${parseInt(meta.color.slice(3,5), 16)}, ${parseInt(meta.color.slice(5,7), 16)}, 0.1)`,
                      border: `1px solid ${meta.color}30`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: meta.color }} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] block mb-1.5"
                      style={{ color: meta.color }}
                    >
                      {activeProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif italic font-semibold" style={{ color: textColor }}>
                      {activeProject.title}
                    </h3>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full"
                      style={{
                        background: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)',
                        color: '#818cf8',
                        border: '1px solid rgba(99,102,241,0.15)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Role + Tools meta */}
                <div
                  className="grid grid-cols-2 gap-4 p-5 rounded-2xl mb-8"
                  style={{
                    background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  }}
                >
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1.5">
                      My Role
                    </span>
                    <span className="text-xs font-semibold" style={{ color: textColor }}>
                      {activeProject.role}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1.5">
                      Stack
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {activeProject.tools.map((t) => (
                        <span key={t} className="text-[9px] font-mono font-bold" style={{ color: meta.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architectural mission */}
                <div className="space-y-7">
                  <div>
                    <h4 className="font-serif italic text-lg font-semibold mb-3" style={{ color: textColor }}>
                      Overview
                    </h4>
                    <p className="font-light text-sm leading-relaxed" style={{ color: mutedColor }}>
                      {activeProject.extendedDescription}
                    </p>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="font-serif italic text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: textColor }}>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Key Outcomes
                    </h4>
                    <ul className="space-y-3">
                      {activeProject.outcomes.map((metric, i) => (
                        <li key={i} className="flex gap-3 text-sm font-light" style={{ color: mutedColor }}>
                          <span className="flex-shrink-0 mt-0.5 h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer links */}
                <div
                  className="flex gap-4 mt-12 pt-8"
                  style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
                >
                  {activeProject.githubUrl ? (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-200 cursor-pointer"
                      style={{ background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'; }}
                    >
                      <Github className="h-4 w-4" /> Source Code
                    </a>
                  ) : null}
                  {activeProject.demoUrl ? (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all btn-shimmer cursor-pointer"
                    >
                      Live Demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {!activeProject.demoUrl && !activeProject.githubUrl && (
                    <div
                      className="w-full text-center text-xs font-mono tracking-widest p-4 rounded-xl uppercase"
                      style={{
                        color: mutedColor,
                        background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                        border: `1px dashed ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      }}
                    >
                      Private Project
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
