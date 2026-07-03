import { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle, RefreshCw, Terminal, ArrowRight, Shield, ExternalLink } from 'lucide-react';

interface ContactConsoleProps {
  isDarkMode: boolean;
}



function FloatingInput({
  id, label, type = 'text', value, onChange, required = false, isDarkMode, placeholder,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean; isDarkMode: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const textColor = isDarkMode ? 'rgba(232,232,240,1)' : 'rgba(17,17,24,1)';
  const mutedColor = isDarkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute left-4 font-mono font-bold uppercase tracking-[0.14em] pointer-events-none transition-all duration-200 z-10"
        style={{
          top: isActive ? '-10px' : '14px',
          fontSize: isActive ? '9px' : '11px',
          color: isActive ? '#6366f1' : mutedColor,
          background: isActive ? (isDarkMode ? '#090b14' : '#FAFAFA') : 'transparent',
          padding: isActive ? '0 4px' : '0',
        }}
      >
        {label}{required && ' *'}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={focused ? placeholder : ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-5 pb-3 text-sm rounded-xl transition-all duration-200 focus:outline-none"
        style={{
          background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          border: `1px solid ${focused ? '#6366f1' : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          color: textColor,
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
        }}
      />
    </div>
  );
}

export default function ContactConsole({ isDarkMode }: ContactConsoleProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Partnership Query');
  const [message, setMessage] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isCompiled, setIsCompiled] = useState(false);
  const [msgFocused, setMsgFocused] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);
  const encKeyRef = useRef('');

  useEffect(() => {
    const arr = new Uint32Array(2);
    window.crypto.getRandomValues(arr);
    encKeyRef.current = 'SHA-256://' + arr[0].toString(16) + arr[1].toString(16);
  }, []);

  const textColor = isDarkMode ? 'rgba(232,232,240,1)' : 'rgba(17,17,24,1)';
  const mutedColor = isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)';

  const handleCompile = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsCompiled(true);
    }, 1100);
  };

  const handleReset = () => {
    setName(''); setEmail(''); setMessage(''); setIsCompiled(false);
  };

  const triggerEmailDispatch = () => {
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Hello Dilip,\n\n${message}\n\n—\nName: ${name}\nEmail: ${email}\n\n[Sent via Neural Portfolio]`
    );
    window.location.href = `mailto:gowdadilip11942@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <section
      id="contact"
      className="py-28 relative"
      style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}
    >
      {/* Ambient orb */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06), transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-[10px] uppercase font-mono tracking-[0.22em] font-bold" style={{ color: '#6366f1' }}>
          Contact
        </span>
      </div>
      <h2
        className="text-4xl md:text-5xl font-serif italic font-semibold tracking-tighter mb-14"
        style={{ color: textColor }}
      >
        Get in Touch
      </h2>

      <div className="grid xl:grid-cols-12 gap-10 relative z-10 items-start">

        {/* ── Form ── */}
        <div
          className="xl:col-span-7 p-8 md:p-10 rounded-2xl"
          style={{
            background: isDarkMode ? 'rgba(15,17,30,0.6)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(24px)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)'}`,
          }}
        >
          {/* Panel header */}
          <div
            className="flex justify-between items-center pb-6 mb-8"
            style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: mutedColor }}>
                Send a Message
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isCompiled ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCompile}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <FloatingInput
                    id="contact-name"
                    label="Name / Org"
                    value={name}
                    onChange={setName}
                    required
                    isDarkMode={isDarkMode}
                    placeholder="Your name..."
                  />
                  <FloatingInput
                    id="contact-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                    isDarkMode={isDarkMode}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject select */}
                <div className="relative">
                  <label
                    htmlFor="contact-subject"
                    className="absolute left-4 font-mono font-bold uppercase tracking-[0.14em] pointer-events-none transition-all duration-200 z-10"
                    style={{
                      top: '-10px',
                      fontSize: '9px',
                      color: selectFocused ? '#6366f1' : 'rgba(99,102,241,0.7)',
                      background: isDarkMode ? '#090b14' : '#FAFAFA',
                      padding: '0 4px',
                    }}
                  >
                    Connection Reason
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onFocus={() => setSelectFocused(true)}
                    onBlur={() => setSelectFocused(false)}
                    className="w-full px-4 py-4 text-sm rounded-xl transition-all duration-200 focus:outline-none appearance-none cursor-pointer"
                    style={{
                      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      border: `1px solid ${selectFocused ? '#6366f1' : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      color: textColor,
                      boxShadow: selectFocused ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
                    }}
                  >
                    <option>General Partnership Query</option>
                    <option>Secure System Development</option>
                    <option>Academic Research Collaboration</option>
                    <option>Saying Hello / Tech Exchange</option>
                  </select>
                </div>

                {/* Message textarea */}
                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className="absolute left-4 font-mono font-bold uppercase tracking-[0.14em] pointer-events-none transition-all duration-200 z-10"
                    style={{
                      top: msgFocused || message.length > 0 ? '-10px' : '14px',
                      fontSize: msgFocused || message.length > 0 ? '9px' : '11px',
                      color: msgFocused ? '#6366f1' : mutedColor,
                      background: msgFocused || message.length > 0
                        ? isDarkMode ? '#090b14' : '#FAFAFA'
                        : 'transparent',
                      padding: msgFocused || message.length > 0 ? '0 4px' : '0',
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setMsgFocused(true)}
                    onBlur={() => setMsgFocused(false)}
                    placeholder={msgFocused ? 'Write your message here...' : ''}
                    className="w-full px-4 pt-5 pb-3 text-sm rounded-xl resize-none transition-all duration-200 focus:outline-none"
                    style={{
                      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      border: `1px solid ${msgFocused ? '#6366f1' : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      color: textColor,
                      boxShadow: msgFocused ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isCompiling}
                  className="w-full rounded-xl py-4 px-4 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: isCompiling
                      ? 'rgba(99,102,241,0.5)'
                      : 'linear-gradient(135deg, #6366f1, #818cf8)',
                    boxShadow: isCompiling ? 'none' : '0 4px 24px rgba(99,102,241,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCompiling) {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(99,102,241,0.55)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(99,102,241,0.4)';
                  }}
                >
                  {isCompiling ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-7 text-center py-4"
              >
                {/* Success icon with ring burst */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute w-24 h-24 rounded-full animate-ping"
                    style={{ background: 'rgba(52,211,153,0.1)', animationDuration: '1.5s' }}
                  />
                  <div
                    className="relative flex items-center justify-center w-16 h-16 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(16,185,129,0.1))',
                      border: '2px solid rgba(52,211,153,0.4)',
                    }}
                  >
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-serif italic font-semibold mb-2" style={{ color: textColor }}>
                    Message Ready!
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">Review your message below and click send.</p>
                </div>

                {/* Message preview */}
                <div
                  className="text-left p-5 rounded-xl font-mono text-[10px] leading-relaxed uppercase tracking-wider"
                  style={{
                    background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  }}
                >
                  <div className="text-slate-400 mb-1 font-bold">FROM:</div>
                  <div className="mb-3" style={{ color: textColor }}>{name} &lt;{email}&gt;</div>
                  <div className="text-slate-400 mb-1 font-bold">RE:</div>
                  <div className="mb-3" style={{ color: textColor }}>{subject}</div>
                  <div className="text-slate-400 mb-1 font-bold">MESSAGE:</div>
                  <div
                    className="p-3 rounded-lg whitespace-pre-wrap normal-case tracking-normal font-light text-[11px]"
                    style={{
                      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      color: mutedColor,
                    }}
                  >
                    {message}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer focus:outline-none"
                    style={{
                      border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      color: mutedColor,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = textColor; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = mutedColor; }}
                  >
                    Edit & Resend
                  </button>
                  <button
                    onClick={triggerEmailDispatch}
                    className="btn-shimmer px-6 py-3 text-white rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                  >
                    Open in Mail <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secure footer */}
          <div
            className="flex items-center gap-2.5 pt-5 mt-6"
            style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
          >
            <span className="text-[9px] font-mono tracking-wider" style={{ color: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}>
              Your message will open in your default mail app pre-filled and ready to send.
            </span>
          </div>
        </div>

        {/* ── Right side: info + social ── */}
        <div className="xl:col-span-5 flex flex-col gap-5">

          {/* Contact meta */}
          <div
            className="p-7 rounded-2xl"
            style={{
              background: isDarkMode ? 'rgba(15,17,30,0.5)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <span
              className="block text-[10px] font-mono font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: '#6366f1' }}
            >
              Contact Info
            </span>
            <p className="text-sm font-light leading-relaxed mb-5" style={{ color: mutedColor }}>
              Connect directly to evaluate code, explore research, or discuss full-stack project builds.
            </p>

            {/* Metrics table */}
            <div
              className="space-y-0 rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
            >
              {[
                { key: 'Official Email', value: 'gowdadilip11942@gmail.com', valueColor: textColor },
                { key: 'Response Time', value: '< 12 Hours', valueColor: '#34d399' },
                { key: 'Availability', value: 'Open to Opportunities', valueColor: '#6366f1' },
                { key: 'Time Zone', value: 'IST (UTC +5:30)', valueColor: textColor },
              ].map((row, i) => (
                <div
                  key={row.key}
                  className="flex justify-between items-center px-4 py-3"
                  style={{
                    background: i % 2 === 0
                      ? isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'
                      : 'transparent',
                    borderBottom: i < 3 ? `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` : 'none',
                  }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>
                    {row.key}
                  </span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: row.valueColor }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
            { icon: FileText, label: 'Resume', sub: 'View / Download PDF', href: '/resume.pdf', color: '#6366f1' as string },
            { icon: Github, label: 'GitHub', sub: 'Source Repos', href: 'https://github.com/Dilipgowdas4084', color: (isDarkMode ? '#e2e8f0' : '#1a1a2e') as string },
            { icon: Linkedin, label: 'LinkedIn', sub: 'Network', href: 'https://www.linkedin.com/in/dilip-gowda-s-191751322/', color: '#0ea5e9' as string },
            { icon: Mail, label: 'Gmail', sub: 'gowdadilip11942@gmail.com', href: 'mailto:gowdadilip11942@gmail.com', color: '#34d399' as string },
          ].map(({ icon: Icon, label, sub, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center justify-center p-5 rounded-2xl text-center transition-all duration-250 cursor-pointer focus:outline-none"
                style={{
                  background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLAnchorElement).style.background = isDarkMode ? `${color}08` : `${color}05`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                  (e.currentTarget as HTMLAnchorElement).style.background = isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                }}
              >
                <>
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl mb-3 transition-transform duration-250 group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: textColor }}>
                    {label}
                  </span>
                  <span className="text-[9px] font-mono" style={{ color: mutedColor }}>
                    {sub}
                  </span>
                </>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
