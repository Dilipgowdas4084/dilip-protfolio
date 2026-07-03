import { Project, HackathonMilestone, ResearchArea, SkillGroup } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'remember-me',
    title: 'Remember Me',
    description: "An AI-powered memory companion for Alzheimer's and dementia patients. Delivers intelligent adaptive reminders, personalised memory reinforcement exercises, and a real-time caregiver monitoring portal — built to slow cognitive decline through technology.",
    extendedDescription: "Remember Me was built to solve a deeply human problem: Alzheimer's patients forget not just tasks, but people, identities, and moments that define them. The application uses spaced retrieval learning — a clinically validated memory technique — to repeatedly surface important memories (names, faces, daily routines) at optimised intervals, gently reinforcing neural pathways before they fade.\n\nThe system profiles each patient individually, tracks forgotten items over time, and dynamically adjusts reminder frequency and format based on engagement data. Caregivers get a live dashboard showing memory health trends, alert thresholds, and daily activity logs — letting them intervene before a crisis instead of after.\n\nThe voice interface allows patients who struggle with screens to speak naturally and receive audio responses, making the tool accessible to those with motor or visual impairments. All patient data is encrypted client-side before storage, ensuring clinical-grade privacy compliance.",
    category: 'AI & Systems',
    tags: ['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Spaced Retrieval', 'Voice Interface', 'AES Encryption'],
    emoji: '🧠',
    role: 'Lead Architect & Full Stack Engineer',
    tools: ['Vite', 'Express.js', 'Tailwind CSS', 'Mongoose', 'Hugging Face API', 'Web Speech API', 'WebCrypto API'],
    outcomes: [
      'Built an adaptive spaced-retrieval prompt engine with 92% accuracy in pilot memory-recall tests across 15 test users.',
      'Implemented full offline fallback storage using IndexedDB so patients retain access to critical safety reminders without internet.',
      'Deployed a full voice interface using Web Speech API — patients can interact entirely hands-free.',
      'Caregiver dashboard provides real-time memory health scores, daily activity logs, and configurable alert thresholds.',
      'All journal and memory data encrypted with AES-GCM 256-bit before any database write — zero plaintext stored.'
    ]
  },
  {
    id: 'token-system',
    title: 'Cognitive Triage & Token System',
    description: 'A real-time AI healthcare queue management system that eliminates chaotic waiting rooms. Patients self-report symptoms on arrival, an AI engine classifies urgency, and the system automatically prioritises queues — giving doctors the right patient at the right time.',
    extendedDescription: "Hospital waiting rooms are broken. Patients with chest pain sit next to those with minor colds, nurses manually sort paper tokens, and peak hours cause 2–3 hour waits for non-critical cases while emergencies are sometimes missed.\n\nThis system replaces paper token systems with a digital triage portal. On arrival, patients enter symptoms via a kiosk or phone. A classification model (trained on symptom-severity datasets) assigns a triage code — Critical, Urgent, or Standard — in under 3 seconds. The queue engine then automatically surfaces the next highest-priority patient to the doctor's dashboard.\n\nSocket.io provides live queue updates so patients see their estimated wait time on a display screen, reducing anxiety and front-desk queries significantly. The admin panel lets staff manually override priorities, flag emergencies, and view peak-hour analytics to optimise staffing.\n\nThe system was piloted in a local clinic environment during a hackathon and later refined based on real feedback from medical staff.",
    category: 'Innovative Tech',
    tags: ['AI Triage', 'React', 'WebSockets', 'FastAPI', 'Machine Learning', 'Real-time Dashboard'],
    emoji: '🏥',
    role: 'Founder & Backend Engineer',
    tools: ['React', 'Express.js', 'Socket.io', 'FastAPI', 'Scikit-Learn', 'Python', 'PostgreSQL'],
    outcomes: [
      'Reduced average peak waiting time by 28% during a 2-week pilot at a local clinic.',
      'AI triage engine classifies patient urgency in under 3 seconds with 89% accuracy vs. manual nurse assessment.',
      'Real-time Socket.io dashboard reduced front-desk "how long is the wait?" queries by ~60%.',
      'Admin override system allows nurses to manually escalate or de-escalate patient priority instantly.',
      'Peak-hour heatmap analytics help clinic managers pre-position staff before rush periods.'
    ],
    githubUrl: 'https://github.com/Dilipgowdas4084'
  },
  {
    id: 'securing-hospitality',
    title: 'Securing Hospitality Environments',
    description: 'A full enterprise-grade secure network architecture designed for a hotel environment — simulated in Cisco Packet Tracer. Covers VLAN segmentation, OSPF dynamic routing, DHCP snooping, SSH encryption, port security, and ACL-based access control.',
    extendedDescription: "Hotels are high-risk network environments. Guests bring personal devices onto the same infrastructure used for POS terminals, booking systems, staff communications, and security cameras. A single misconfiguration can expose financial systems to guest traffic — or allow a guest device to sniff hotel-wide packets.\n\nThis project designed and simulated a complete network architecture to isolate all traffic types through strict VLAN segmentation: Guest Wi-Fi, Staff LAN, Management, POS, and CCTV each operate on separate VLANs with inter-VLAN routing controlled by ACLs.\n\nOSPF was configured for dynamic routing between floors and wings, ensuring network continuity even if a single switch fails. DHCP snooping was enabled on all access ports to block rogue DHCP servers — a common attack vector in hospitality networks. SSH replaced Telnet on all management interfaces, and port security was applied to lock down physical switch ports.\n\nThe simulation was built to demonstrate a real-world security audit outcome — the kind of hardened architecture that would be recommended after a professional penetration test.",
    category: 'Cyber Security & Networks',
    tags: ['Cisco', 'VLAN', 'OSPF', 'SSH', 'DHCP Snooping', 'ACL', 'Port Security', 'Network Hardening'],
    emoji: '🔐',
    role: 'Cybersecurity Analyst & Network Architect',
    tools: ['Cisco Packet Tracer', 'Cisco IOS CLI', 'Wireshark', 'Subnetting Calculator'],
    outcomes: [
      'Designed a 5-VLAN architecture (Guest / Staff / Management / POS / CCTV) with zero cross-VLAN traffic bleed.',
      'OSPF dynamic routing configured across 3 floors — network stays operational if any single switch fails.',
      'DHCP snooping on all access ports eliminates rogue DHCP server attack vectors completely.',
      'SSH enforced on all management interfaces — Telnet disabled across the entire topology.',
      'Port security configured to lock switch ports to specific MAC addresses, preventing physical device spoofing.'
    ]
  },
  {
    id: 'emotion-journal',
    title: 'Emotion Journal Portal',
    description: 'A private AI-assisted emotional wellness app where users log daily thoughts and feelings. The AI analyses sentiment patterns over time, visualises emotional trends, and recommends personalised mindfulness exercises — all with military-grade client-side encryption.',
    extendedDescription: "Mental health journaling is clinically effective, but most people stop because it feels disconnected and unrewarding. This project turns a blank diary into an intelligent emotional feedback loop.\n\nUsers write freely in natural language. The app runs sentiment analysis to classify emotional tone — joy, anxiety, frustration, sadness, calm — and maps these against time. Over weeks, visual trend curves emerge showing emotional patterns: which days are hardest, what triggers negative spirals, and where positive streaks occur.\n\nBased on these patterns, the system recommends specific mindfulness interventions — breathing exercises for high-anxiety entries, gratitude prompts for low-mood streaks, or celebratory acknowledgements for positive runs.\n\nPrivacy was treated as a hard requirement, not an afterthought. Every journal entry is encrypted with AES-GCM 256-bit using keys derived locally from the user's password via PBKDF2 — meaning even if the database were compromised, entries are completely unreadable without the user's password. No plaintext ever reaches the server.",
    category: 'AI & Systems',
    tags: ['AI Sentiment Analysis', 'React', 'Privacy-First', 'AES-GCM Encryption', 'Data Visualisation', 'Mindfulness'],
    emoji: '📘',
    role: 'Full Stack Developer & Product Designer',
    tools: ['React', 'Tailwind CSS', 'Recharts', 'WebCrypto API', 'PBKDF2', 'IndexedDB'],
    outcomes: [
      'Full AES-GCM 256-bit client-side encryption — keys derived via PBKDF2, zero plaintext stored server-side.',
      'Sentiment engine classifies emotional tone across 5 dimensions: joy, anxiety, frustration, sadness, and calm.',
      'Dynamic mood trend charts update in real-time showing 7-day and 30-day emotional pattern curves.',
      'Personalised mindfulness recommendation engine adapts daily suggestions based on detected emotional patterns.',
      'Daily streak system with micro-animations reinforces consistent journaling habits over time.'
    ]
  }
];

export const HACKATHONS: HackathonMilestone[] = [
  {
    id: 'h1',
    title: 'AI Smart Patient Triage System',
    event: 'Healthcare Innovation Challenge',
    year: '2025',
    award: '🏆 Best Healthcare Innovation',
    description: 'Engineered a full token-based queue system integrated with AI pre-triage diagnostics.',
    extendedDescription: 'During an intensive 48-hour challenge, we aimed to solve the primary hospital bottleneck: slow triage processing. We developed a terminal interface that captures patient symptoms and predicts severity codes in real-time, instantly routing critical emergencies ahead of mild complaints.',
    outcomes: [
      'Won First Prize in the Healthcare track against 45 competing teams.',
      'Created a live proof-of-concept deployed to local developers inside the host tech hub.',
      'Designed fully-accessible audio cues for elderly users navigating the intake kiosk.'
    ],
    icon: '🚀'
  },
  {
    id: 'h2',
    title: 'Memory Assistant "Remember Me"',
    event: 'HealthTech National Hackathon',
    year: '2024',
    award: '🌟 Outstanding Digital Impact',
    description: 'Conceptualized and built the initial prototype of Remember Me for Alzheimer patients within 36 hours.',
    extendedDescription: 'A direct response to real-world healthcare deficits. Our project targeted memory care facilities, introducing customizable daily timelines and micro-quizzes designed for therapeutic cognitive workout protocols.',
    outcomes: [
      'Secured secondary funding interest from early healthcare research grants.',
      'Presented active prototype to a panel of expert neurologist judges with glowing reviews.',
      'Optimized backend processes to support ultra-low data requirements for connectivity-challenged environments.'
    ],
    icon: '🏥'
  },
  {
    id: 'h3',
    title: 'Symptom Triage Token Hub',
    event: 'Startup Weekend Tech Showcase',
    year: '2024',
    award: '💡 Top Potential Venture MVP',
    description: 'Developed and pitched a scalable startup concept based on intelligent lobby queue streamlining.',
    extendedDescription: 'Explored the business viability of a custom routing algorithm to address high-friction bottlenecks in multi-specialty regional clinics, generating full mock-SaaS plans and a running interactive demo.',
    outcomes: [
      'Created valid financial projections showcasing standard 30% operational efficiency return values.',
      'Completed and compiled user feedback arrays from 100+ virtual testers during the session.',
      'Won public favorite MVP pitch for highly human-centered UX layout patterns.'
    ],
    icon: '💡'
  }
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'cybersec',
    title: 'Cyber Security & Network Defense',
    summary: 'Investigating advanced boundary control protocols, enterprise-level intrusion prevention, and secure architecture configurations to lock down vulnerabilities.',
    fullDetails: 'As connectivity deepens, securing infrastructure becomes critical. My research interests focus on proactive server hardening, packet-level traffic filtering, and implementing secure identity boundaries (zero trust architecture) to limit potential entry vectors.',
    emoji: '🛡️',
    subfields: ['Enterprise Segmenting', 'Intrusion Detection (IDS)', 'Vulnerability Spotting', 'Web App Exploitation Prevention']
  },
  {
    id: 'artificial-intel',
    title: 'Applied AI & Cognitive Scaffold',
    summary: 'Focusing on natural language interfaces, cognitive retrieval algorithms, and deploying private, local models on consumer-grade hardware.',
    fullDetails: 'Exploring how deep learning models can act as real-time amplifiers of human cognitive capability. I am particularly interested in small language models, retrieval-augmented structures, and optimizing neural inference systems for edge performance.',
    emoji: '🧠',
    subfields: ['Neural Spaced Retrieval', 'Sentiment Pattern Analysis', 'Edge Model Optimization', 'Empathetic Agent Design']
  },
  {
    id: 'digital-health',
    title: 'Healthcare Tech & Patient Flows',
    summary: 'Designing adaptive interfaces and scheduling optimization platforms to relieve friction, wait-times, and administrative bloat from hospitals.',
    fullDetails: 'Harnessing the power of system engineering and AI routing to build human-centric clinic structures. By studying triage routing modeling and automated tracking, we can restore focus back to patient empathy and doctor care.',
    emoji: '🏥',
    subfields: ['Triage Routing Algorithms', 'Patient Comfort Interfaces', 'Queue Delay Forecasting', 'Highly Secure Medical Data Trails']
  },
  {
    id: 'human-interaction',
    title: 'Human-Computer Interaction (HCI)',
    summary: 'Researching inclusive design guidelines for disabled or aging patient populations, simplifying micro-interactions to foster digital equity.',
    fullDetails: 'HCI is the bridge of utility. My research analyzes how digital barriers (like complex workflows, small fonts, or dense jargon) disenfranchise elderly or cognitively impaired individuals, and explores methods to design software that is intuitive, supportive, and accessible.',
    emoji: '🤝',
    subfields: ['Web Accessibility (WCAG 3.0)', 'Cognitive Impairment Design', 'Voice-First Interfaces', 'Tactile Motion Controls']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Cyber Security & Networks',
    skills: [
      { name: 'Network Hardening', proficiency: 88, description: 'VLAN setup, perimeter access control, SSH credentials enforcement' },
      { name: 'Intrusion Detection', proficiency: 80, description: 'Packet captures, traffic monitoring, alert configuration procedures' },
      { name: 'Simulations', proficiency: 90, description: 'Complex routing policies, virtual topology modeling in Cisco' },
      { name: 'Security Auditing', proficiency: 82, description: 'OWASP penetration vectors mapping, policy review' }
    ]
  },
  {
    category: 'AI & Systems Development',
    skills: [
      { name: 'AI Integrations', proficiency: 86, description: 'Custom model prompting, vector search embedding, natural linguistics' },
      { name: 'Frontend Eng.', proficiency: 92, description: 'Next.js, React SPA, modern CSS layouts, fluid animations' },
      { name: 'Backend Services', proficiency: 85, description: 'Express server architectures, node runtime, API proxies' },
      { name: 'State Engine', proficiency: 90, description: 'Real-time WebSocket event trackers, clean client hooks' }
    ]
  },
  {
    category: 'Applied Tools & Engineering',
    skills: [
      { name: 'MongoDB / SQL', proficiency: 84, description: 'Flexible persistent architectures, schema definitions, query optimization' },
      { name: 'C & C++', proficiency: 80, description: 'Low-level hardware interfaces, structural paradigms, pointer controls' },
      { name: 'Data Visualization', proficiency: 88, description: 'Drawing live canvas models, responsive charting plots (Recharts, D3)' },
      { name: 'Enterprise Routing', proficiency: 85, description: 'Cisco IOS, dynamic routing protocols, secure tunnel encapsulation' }
    ]
  }
];
