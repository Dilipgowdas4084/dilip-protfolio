# Dilip Gowda S — Personal Portfolio

> A premium personal portfolio built with React, TypeScript, and Framer Motion. Designed with a Silicon Valley aesthetic — dark-first, glassmorphism UI, smooth animations, and a fully interactive skill & project showcase.

---

## 🔗 Live Links

- **GitHub:** [github.com/Dilipgowdas4084](https://github.com/Dilipgowdas4084)
- **LinkedIn:** [dilip-gowda-s-191751322](https://www.linkedin.com/in/dilip-gowda-s-191751322/)
- **Email:** gowdadilip11942@gmail.com

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animations | Framer Motion (`motion/react`) |
| Icons | Lucide React |
| Canvas | HTML5 Canvas API (particle sphere) |

---

## ✨ Features

### 🎬 Animated Loader
- Three counter-rotating arc rings with glow effects
- Terminal-style boot log sequence with blinking cursor
- Shimmer progress bar
- Smooth transition into the main portfolio

### 🏠 Hero Section
- Dark-first design with light/dark mode toggle
- Staggered word-by-word headline entrance animation
- Gradient cycling text effect
- Floating ambient orb backgrounds
- Dot grid background pattern
- Scroll-aware frosted glass navbar

### 🌐 Interactive Particle Sphere
- 420 depth-sorted particles rendered on HTML5 Canvas
- Multi-color palette: indigo, violet, sky, emerald
- Mouse magnetic pull — particles react to cursor position
- Glowing pulsing core node
- Equatorial decorative ring
- Ambient inner radial glow

### 🗂️ Projects Section
- Glassmorphism bento-grid cards
- Category-specific color theming (AI & Systems / Cybersecurity / Innovative Tech)
- Hover lift + shadow bloom effects
- Gradient top accent bar per card
- Search bar to filter projects
- Category pill filters
- Slide-over case study drawer with full project details, role, stack, and outcomes

### 👤 About & Skills
- Animated count-up stat cards (triggered on scroll into view)
- Left-border gradient bio card
- Philosophy quote block
- Interactive skill tabs (Security / Systems / Networking)
- Per-category color-coded progress bars with glow
- Hover tooltip showing skill description

### 🏆 Journey (Hackathons & Research)
- Gradient vertical timeline line
- Animated pulsing timeline nodes — color-matched to award type
- Expandable accordion for hackathon outcomes
- Research area grid with per-domain color theming
- Smooth panel transitions between research topics

### 📬 Contact
- Floating label form inputs (label rises on focus/fill)
- Subject dropdown
- Gradient submit button with hover lift effect
- Animated success state with pulsing ring burst
- Alternating-row contact info table
- Social link cards (GitHub, LinkedIn, Gmail, Resume) with per-brand color hover

---

## 📁 Project Structure

```
src/
├── App.tsx                  # Root shell — navbar, hero, layout, footer
├── main.tsx                 # React entry point
├── index.css                # Global design system, keyframes, tokens
├── data.ts                  # All portfolio content (projects, skills, hackathons, research)
├── types.ts                 # TypeScript interfaces
└── components/
    ├── Loader.tsx            # Boot screen with animated rings and terminal logs
    ├── ParticleSphere.tsx    # Interactive 3D particle canvas
    ├── ProjectGrid.tsx       # Bento grid + case study drawer
    ├── InteractiveAbout.tsx  # Bio, stats, skill bars
    ├── JourneyTimeline.tsx   # Hackathon timeline + research areas
    └── ContactConsole.tsx    # Contact form + social links
```

---

## 🗃️ Projects Showcased

### 🏥 Cognitive Triage & Token System
A hospital queue management system that automates patient prioritization based on vitals and symptom self-reports. Built to reduce peak waiting times in local clinics.

- **Stack:** Python, React, Firebase
- **Outcome:** Reduced average waiting duration by 28% in pilot clinics

### 🔒 Securing Hospitality Networks
A full network security audit and hardening implementation for a hospitality business. Covers firewall configuration, intrusion detection, and staff security training.

- **Stack:** Wireshark, pfSense, Nmap, Metasploit
- **Outcome:** Eliminated critical vulnerabilities, zero breaches post-deployment

### 🤖 Agentic AI Research Assistant
An autonomous research assistant that uses LLM agents to gather, summarize, and cross-reference academic papers and web sources for a given topic.

- **Stack:** Python, LangChain, OpenAI API, Streamlit
- **Outcome:** Reduced manual research time by ~60% in user tests

### 🧠 Neural Interface for AAC
An alternative and augmentative communication (AAC) device prototype using EEG signals and ML classification to help non-verbal individuals communicate.

- **Stack:** Python, MNE, Scikit-learn, Raspberry Pi
- **Outcome:** Achieved 87% classification accuracy across 5 test subjects

---

## 🏆 Hackathon Achievements

- **HackNSUT 2024** — Built a real-time hospital token management system, awarded Best Healthcare Hack
- **Smart India Hackathon 2024** — Developed an AI-powered intrusion detection system for critical infrastructure
- **HackBVP 2023** — Created an accessible AAC interface using EEG and ML, won Innovation Award

---

## 🔬 Research Areas

- **Cybersecurity & Threat Intelligence** — Defensive architectures, network hardening, penetration testing
- **Agentic AI Systems** — Multi-agent orchestration, autonomous research tools, LLM pipelines
- **Human-Computer Interaction** — AAC devices, accessibility tech, EEG-based interfaces
- **Healthcare Informatics** — Hospital workflow automation, patient prioritization systems

---

## 🚀 Run Locally

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/Dilipgowdas4084/dilip-protfolio.git
cd dilip-protfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready to deploy on Vercel, Netlify, or GitHub Pages.

---

## 📄 License

MIT — feel free to fork and adapt for your own portfolio.
