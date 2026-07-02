import { Project, HackathonMilestone, ResearchArea, SkillGroup } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'remember-me',
    title: 'Remember Me',
    description: 'AI-powered memory assistant for Alzheimer’s patients. Features intelligent adaptive reminders, personalized memory reinforcement prompts, and an interactive caregiver portal.',
    extendedDescription: 'A breakthrough project engineered to provide cognitive scaffolding for individuals experiencing progressive memory impairment. The application analyzes user conversational patterns, automatically tracks forgotten tasks, and uses spaced retrieval learning to gently prompt users with stories from their past, helping maintain synaptic pathways.',
    category: 'AI & Systems',
    tags: ['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Spaced Retrieval'],
    emoji: '🧠',
    role: 'Lead Architect & Full Stack Engineer',
    tools: ['Vite', 'Express', 'Tailwind CSS', 'Mongoose', 'Hugging Face API'],
    outcomes: [
      'Engineered an adaptive prompt system with 92% response accuracy from memory-test pilots.',
      'Designed high-end secure offline fallback storage to ensure access to essential safety memory notes.',
      'Implemented full voice interface enabling patients to speak naturally to the reminder engine.'
    ]
  },
  {
    id: 'token-system',
    title: 'Cognitive Triage & Token System',
    description: 'AI healthcare queue management framework featuring real-time patient symptom triage, emergency prioritization protocols, and queue predictive analytics.',
    extendedDescription: 'A real-time solution built for medical center reception areas to eliminate chaotic queuing and patient anxiety. Utilizing custom classification pipelines, the portal automatically tags the urgency of incoming symptoms and predicts wait times accurately while managing digitized emergency and general queues.',
    category: 'Innovative Tech',
    tags: ['AI Triage', 'Full Stack', 'Predictive Analysis', 'WebSockets'],
    emoji: '🏥',
    role: 'Venture Founder & Backend Engineer',
    tools: ['React', 'Express', 'Socket.io', 'FastAPI', 'SciKit-Learn'],
    outcomes: [
      'Reduced average peak waiting duration in local pilot clinics by 28%.',
      'Engineered automated priority elevation algorithm based on vitals and symptoms self-reports.',
      'Created live-stream dashboard built with crisp layout showing real-time token states.'
    ],
    githubUrl: 'https://github.com/Dilipgowdas4084'
  },
  {
    id: 'securing-hospitality',
    title: 'Securing Hospitality Environments',
    description: 'Comprehensive enterprise hotel secure network simulated in Cisco Packet Tracer: configured VLANs, OSPF routing, secure DHCP pools, SSH, and port level protection.',
    extendedDescription: 'A custom, industry-grade network architecture designed to isolate client traffic while serving internal hotel operations securely. The infrastructure includes layered VLAN divisions, OSPF configuration for robust routing, SSH shell encryption for remote management interfaces, access control lists, and tight physical port security on main perimeter switches.',
    category: 'Cyber Security & Networks',
    tags: ['Cisco', 'VLAN', 'OSPF', 'SSH Encryption', 'Network Hardening'],
    emoji: '🔐',
    role: 'Cybersecurity Analyst',
    tools: ['Cisco Packet Tracer', 'Subnetting Tools', 'Wireshark Analyzer'],
    outcomes: [
      'Eliminated potential rogue-DHCP spoof attacks by deploying DHCP snooping security features.',
      'Segmented public and administrative traffic safely through isolated, policy-controlled VLANs.',
      'Designed redundant failover links securing continuous connectivity for essential check-in nodes.'
    ]
  },
  {
    id: 'emotion-journal',
    title: 'Emotion Journal Portal',
    description: 'AI-assisted secure emotional wellness and tracking platform that detects psychological sentiments and recommends private, personalized mindfulness routines.',
    extendedDescription: 'An interactive therapeutic diary designed from the ground up for high-privacy compliance. Entries are analyzed locally (or proxied safely) to map trends visually in emotional curves, recognizing triggers and recommending positive behavioral intervention steps.',
    category: 'AI & Systems',
    tags: ['AI Sentiment', 'React', 'Privacy-First', 'Interactive Charting'],
    emoji: '📘',
    role: 'Full Stack Creator',
    tools: ['React', 'Tailwind', 'Recharts', 'WebCrypto API'],
    outcomes: [
      'Integrated military-grade AES-GCM client-side encryption of all journaling text prior to database writes.',
      'Designed rich custom micro-interaction state models showing dynamic color shifts tied to mood sentiments.',
      'Created modular, accessible daily streak systems to prompt consistent mindfulness reflection.'
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
