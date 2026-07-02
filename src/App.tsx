import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, ChevronDown, MapPin, Zap, Terminal } from 'lucide-react';
import Loader from './components/Loader';
import ParticleSphere from './components/ParticleSphere';
import ProjectGrid from './components/ProjectGrid';
import InteractiveAbout from './components/InteractiveAbout';
import JourneyTimeline from './components/JourneyTimeline';
import ContactConsole from './components/ContactConsole';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode default — Silicon Valley standard
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAnchor = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  const heroWords = ['Dilip', 'Gowda', 'S.'];

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="min-h-screen bg-[#050810] text-[#E8E8F0] dark:bg-[#050810] dark:text-[#E8E8F0] selection:bg-indigo-500/30 selection:text-indigo-100"
            style={{ background: isDarkMode ? '#050810' : '#F4F4F8' }}
          >
            {/* Scroll progress line */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-[90]">
              <motion.div
                className="h-full"
                style={{
                  width: `${scrollProgress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #818cf8, #38bdf8)',
                }}
              />
            </div>

            {/* ═══ NAVBAR ═══ */}
            <motion.header
              className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
                scrolled
                  ? 'py-4 bg-[#050810]/90 dark:bg-[#050810]/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                  : 'py-6 bg-transparent'
              }`}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={!isDarkMode ? { 
                backgroundColor: scrolled ? 'rgba(244,244,248,0.92)' : 'transparent',
                borderBottomColor: scrolled ? 'rgba(0,0,0,0.06)' : 'transparent'
              } : {}}
            >
              {/* Logo */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => scrollToAnchor('hero')}
                  className="relative group flex items-center gap-2 cursor-pointer"
                  aria-label="Go to top"
                >
                  <span
                    className="text-2xl font-serif italic font-semibold tracking-tighter transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #a78bfa, #6366f1, #38bdf8)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    DG.
                  </span>
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #38bdf8)' }}
                  />
                </button>
                <div className="h-3.5 w-px bg-white/10 dark:bg-white/10 hidden sm:block" />
                <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-[0.22em] text-slate-500 font-semibold">
                  Portfolio
                </span>
              </div>

              {/* Nav links + toggle */}
              <div className="flex items-center gap-7">
                <nav className="hidden md:flex items-center gap-7">
                  {['projects', 'about', 'journey', 'contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToAnchor(item)}
                      className="relative group text-[11px] uppercase tracking-widest font-semibold text-white/40 hover:text-white dark:text-white/40 dark:hover:text-white transition-colors duration-200 cursor-pointer"
                      style={!isDarkMode ? { color: 'rgba(0,0,0,0.45)' } : {}}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-indigo-400" />
                    </button>
                  ))}
                </nav>

                <div className="h-4 w-px bg-white/10 hidden md:block" />

                {/* Theme toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="relative w-12 h-6 rounded-full p-0.5 flex items-center cursor-pointer transition-all duration-300 focus:outline-none"
                  style={{
                    background: isDarkMode
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))'
                      : 'rgba(0,0,0,0.1)',
                    border: isDarkMode ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(0,0,0,0.1)',
                  }}
                  aria-label="Toggle theme"
                >
                  <motion.div
                    className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ x: isDarkMode ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                    style={{
                      background: isDarkMode
                        ? 'linear-gradient(135deg, #6366f1, #818cf8)'
                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    }}
                  >
                    {isDarkMode ? (
                      <Moon className="h-2.5 w-2.5 text-white" />
                    ) : (
                      <Sun className="h-2.5 w-2.5 text-white" />
                    )}
                  </motion.div>
                </button>
              </div>
            </motion.header>

            {/* ═══ HERO SECTION ═══ */}
            <section
              id="hero"
              className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
            >
              {/* Background dot grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: isDarkMode
                    ? 'radial-gradient(rgba(99,102,241,0.15) 1px, transparent 1px)'
                    : 'radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  opacity: 0.7,
                }}
              />

              {/* Ambient orbs */}
              <div
                className="orb w-[600px] h-[600px] -top-32 -left-32 opacity-20"
                style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
              />
              <div
                className="orb w-[500px] h-[500px] -bottom-24 -right-24 opacity-15"
                style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', animationDelay: '2s' }}
              />
              <div
                className="orb w-96 h-96 top-1/3 left-1/2 -translate-x-1/2 opacity-10"
                style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', animationDelay: '1s' }}
              />

              {/* Interactive particle sphere */}
              <ParticleSphere isDarkMode={isDarkMode} />

              {/* Hero content */}
              <div className="relative max-w-5xl mx-auto text-center px-6 md:px-12 z-10 flex flex-col items-center">

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase font-mono font-semibold text-indigo-300">
                    Open to Opportunities · Bangalore, India
                  </span>
                </motion.div>

                {/* Strategic label */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11px] uppercase tracking-[0.38em] font-mono font-bold mb-6"
                  style={{ color: '#6366f1' }}
                >
                  Cybersecurity & Artificial Intelligence
                </motion.p>

                {/* Main animated headline */}
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
                  {heroWords.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 50, rotateX: -30 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.55 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-7xl sm:text-8xl md:text-[110px] font-serif italic font-semibold leading-none tracking-tighter"
                      style={
                        i === heroWords.length - 1
                          ? {
                              background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 40%, #38bdf8 80%)',
                              backgroundSize: '200% 200%',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              animation: 'gradient-shift 5s ease infinite',
                            }
                          : { color: isDarkMode ? '#E8E8F0' : '#111118' }
                      }
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                {/* Specialties */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.95, duration: 0.8 }}
                  className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-[0.18em] font-medium mb-8"
                  style={{ color: isDarkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}
                >
                  {['Security Scholar', 'AI Software Engineer', 'Full Stack Architect'].map((role, i) => (
                    <>
                      <span key={role}>{role}</span>
                      {i < 2 && (
                        <span key={`sep-${i}`} style={{ color: isDarkMode ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.5)' }}>
                          /
                        </span>
                      )}
                    </>
                  ))}
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.7 }}
                  className="text-lg font-light leading-relaxed max-w-2xl mb-12"
                  style={{ color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.55)' }}
                >
                  Architecting the equilibrium between{' '}
                  <span
                    className="font-medium italic"
                    style={{
                      background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Cybersecurity
                  </span>{' '}
                  and{' '}
                  <span
                    className="font-medium italic"
                    style={{
                      background: 'linear-gradient(90deg, #38bdf8, #34d399)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Artificial Intelligence
                  </span>{' '}
                  — securing the next generation of digital infrastructure.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 items-center"
                >
                  <button
                    onClick={() => scrollToAnchor('projects')}
                    className="btn-shimmer px-9 py-4 text-white text-xs uppercase tracking-widest font-bold rounded-full cursor-pointer focus:outline-none"
                    style={{ minWidth: '180px' }}
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => scrollToAnchor('contact')}
                    className="px-9 py-4 text-xs uppercase tracking-widest font-bold rounded-full cursor-pointer focus:outline-none transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      border: '1px solid rgba(99,102,241,0.35)',
                      color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                      background: 'rgba(99,102,241,0.05)',
                      backdropFilter: 'blur(8px)',
                      minWidth: '180px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)';
                      e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)';
                      e.currentTarget.style.background = 'rgba(99,102,241,0.05)';
                    }}
                  >
                    Let's Connect
                  </button>
                </motion.div>
              </div>

              {/* Bottom diagnostic strip */}
              <div
                className="absolute bottom-8 left-8 right-8 hidden lg:flex justify-between items-center text-[9px] font-mono pointer-events-none select-none max-w-7xl mx-auto px-6"
                style={{ color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)' }}
              >
                <div className="flex gap-5">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-indigo-400" />
                    Bangalore, India
                  </span>
                  <span style={{ color: 'rgba(99,102,241,0.4)' }}>//</span>
                  <span>Available for Work</span>
                </div>
                <div className="flex gap-5">
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3 w-3 text-emerald-400" />
                    Full Stack · Cybersecurity · AI
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3 w-3 text-indigo-400" />
                    2026
                  </span>
                </div>
              </div>

              {/* Scroll indicator */}
              <button
                onClick={() => scrollToAnchor('projects')}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] font-mono tracking-widest cursor-pointer transition-colors duration-200 scroll-indicator focus:outline-none"
                style={{ color: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'; }}
              >
                <span>SCROLL</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </section>

            {/* ═══ MAIN CONTENT ═══ */}
            <main
              className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 pb-32"
              style={{ color: isDarkMode ? '#E8E8F0' : '#111118' }}
            >
              <ProjectGrid isDarkMode={isDarkMode} />
              <InteractiveAbout isDarkMode={isDarkMode} />
              <JourneyTimeline isDarkMode={isDarkMode} />
              <ContactConsole isDarkMode={isDarkMode} />
            </main>

            {/* ═══ FOOTER ═══ */}
            <footer
              className="border-t py-12 px-6 md:px-12 transition-colors"
              style={{
                borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
                background: isDarkMode ? 'rgba(5,8,16,0.8)' : 'rgba(244,244,248,0.8)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] tracking-wider uppercase">
                <div className="flex items-center gap-3">
                  <span
                    className="font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    DILIP GOWDA S.
                  </span>
                  <span style={{ color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>//</span>
                  <span style={{ color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>
                    © {currentYear} Dilip Gowda S
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className="hidden md:flex items-center gap-1.5"
                    style={{ color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)' }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    Available for hire
                  </span>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-1.5 transition-colors duration-200 cursor-pointer focus:outline-none"
                    style={{ color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)'; }}
                  >
                    BACK TO TOP <ChevronDown className="h-3 w-3 rotate-180" />
                  </button>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
