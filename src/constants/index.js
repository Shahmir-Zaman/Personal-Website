const navLinks = [
  {
    name: 'Skills',
    link: '#techstack',
  },
  {
    name: 'Experience',
    link: '#experience',
  },
  {
    name: 'Projects',
    link: '#projects',
  },
];

// The hero slider cycles through four words and needs the list twice so the
// wordSlider keyframes in index.css can loop without a visible jump.
const heroWords = [
  { text: 'Data', imgPath: '/images/Abilities/db.webp' },
  { text: 'AI', imgPath: '/images/Abilities/ai.webp' },
  { text: 'Code', imgPath: '/images/code.svg' },
  { text: 'Ideas', imgPath: '/images/ideas.svg' },
];
const words = [...heroWords, ...heroWords];

// Not rendered on the page (the Skills section is the 3D tech grid); this is
// the skills entry of the AI assistant's knowledge base in lib/shahmirProfile.js.
const abilities = [
  {
    imgPath: '/images/Abilities/code.webp',
    title: 'Full-Stack Development',
    desc: 'Designing and building end-to-end applications with MERN, REST APIs, and responsive UIs using clean, scalable code.',
  },
  {
    imgPath: '/images/Abilities/ai.webp',
    title: 'AI & Automation',
    desc: 'Integrating AI-powered features and orchestrating workflows with APIs, LLMs, and tools like n8n for smarter solutions.',
  },
  {
    imgPath: '/images/Abilities/cloud.webp',
    title: 'Cloud Deployment',
    desc: 'Deploying and managing applications on AWS & GCP with CI/CD pipelines, DNS, and SSL for production-ready reliability.',
  },
  {
    imgPath: '/images/Abilities/db.webp',
    title: 'Database Design',
    desc: 'Structuring and managing data with MySQL, PostgreSQL, Prisma, and MongoDB for robust, efficient storage solutions.',
  },
];


const techStackIcons = [
  {
    name: 'Full-Stack Developer',
    tools: 'React · Next.js · Node.js · Express',
    modelPath: '/models/react_logo-transformed.glb',
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: 'Python & ML Engineer',
    tools: 'Python · XGBoost · LLMs · RAG',
    modelPath: '/models/python-transformed.glb',
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: 'Cloud Deployment',
    tools: 'AWS · GCP · CI/CD',
    modelPath: '/models/Cloud.glb',
    scale: 0.9,
    rotation: [0, 0, 0],
  },
  {
    name: 'Database Specialist',
    tools: 'PostgreSQL · MySQL · MongoDB · Prisma',
    modelPath: '/models/Database.glb',
    scale: 0.9,
    rotation: [0, 0, 0],
    position: [0, 1.2, 0],
  },
  {
    name: 'API Developer',
    tools: 'REST · WebSockets · n8n',
    modelPath: '/models/API.glb',
    scale: 1,
    rotation: [0, 0, 0],
  },
];

// Projects render in ShowcaseSection: the first entry gets the large featured
// layout, the rest share the grid below it. Every one ships with a live site and
// a public repo (PRODUCT.md: proof over assertion).
//
// `responsibilities` is NOT rendered. It is the long-form detail fed to the AI
// assistant's knowledge base via lib/shahmirProfile.js.
const webExpCards = [
  {
    title: 'Notery',
    kind: 'AI-Enhanced Note-Taking App',
    summary: 'Notes with AI-generated contextual responses saved alongside them, on a typesafe Postgres backend.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'OpenAI'],
    highlight: 'Accessible, responsive UI built on Radix primitives',
    imgPath: '/images/project1.webp',
    liveUrl: 'https://notery.shahmirzaman.dev',
    repoUrl: 'https://github.com/Shahmir-Zaman/Notery',
    responsibilities: [
      'Developed a server-rendered note app with Next.js (App Router), React, and TypeScript.',
      'Designed a relational schema with Prisma and Supabase PostgreSQL, exposing typesafe RESTful CRUD APIs.',
      'Integrated the OpenAI API to auto-generate contextual responses, persisted alongside user notes.',
      'Built an accessible, responsive UI with Tailwind CSS, shadcn/ui, and Radix components.',
    ],
  },
  {
    title: 'SumAI',
    kind: 'AI Document Summarizer',
    summary: 'Upload a PDF or TXT file and get a structured summary back, processed end to end by a self-hosted LLM pipeline.',
    stack: ['React', 'TypeScript', 'Vite', 'n8n', 'GCP', 'Llama 3.2'],
    highlight: 'Self-hosted n8n + Llama 3.2 workflow running on GCP',
    imgPath: '/images/project2.webp',
    liveUrl: 'https://sumai.shahmirzaman.dev',
    repoUrl: 'https://github.com/Shahmir-Zaman/SumAI',
    responsibilities: [
      'Architected a fullstack AI document summarizer with React, TypeScript, Vite, and Tailwind CSS.',
      'Deployed & orchestrated a self-hosted n8n workflow on GCP for automated PDF/TXT processing and summarization with Llama 3.2.',
      'Integrated drag-and-drop uploads, file validation, and progress tracking with React Context + useReducer.',
      'Hardened the pipeline for scalability and reliability, streamlining end-to-end AI document processing.',
    ],
  },
  {
    title: 'RoamAura',
    kind: 'Full-Stack Listing Platform',
    summary: 'A server-rendered rental marketplace with authenticated sessions, property listings, and validated user input.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Passport.js', 'EJS'],
    highlight: 'Modular REST backend with Joi-validated middleware',
    imgPath: '/images/project3.webp',
    liveUrl: 'https://roamaura.shahmirzaman.dev',
    repoUrl: 'https://github.com/Shahmir-Zaman/Roamaura',
    responsibilities: [
      'Architected a server-rendered fullstack platform with Node.js, Express, MongoDB, and EJS templates.',
      'Developed a RESTful backend with modular controllers and routes for property listings and user management.',
      'Implemented Passport.js authentication with express-session and connect-mongo for secure sessions.',
      'Validated Mongoose schemas and built Joi-based middleware for robust input handling.',
    ],
  },
];

// SmartBuild renders as its own section (MLCaseStudy); this entry feeds the AI
// assistant only.
const aiExpCards = [
  {
    title: 'SmartBuild',
    kind: 'Predictive Quality Assurance',
    // Team engagement — PRODUCT.md is explicit that copy must not imply sole
    // authorship, so the summary names the team up front.
    summary: 'A consulting engagement with two teammates, pitched to SmartBuild’s CEO and CTO: models that catch defective raw material before it reaches production.',
    stack: ['Python', 'XGBoost', 'Polynomial Regression'],
    highlight: '€126,520 net savings per production batch',
    responsibilities: [
      'Worked in a three-person team on a predictive quality assurance pipeline, migrating from Linear to Polynomial Regression to eliminate residual bias and achieve an R² > 0.99.',
      'Developed an XGBoost classification model acting as a material "Gatekeeper" to identify and discard defective raw materials before production.',
      'Translated technical metrics into business ROI, generating a net savings of €126,520 per production batch by reducing defect-related losses by over 80%.'
    ],
  }
];

// Confirmed employment. Shape: { role, company, date, logoPath, summary?: string, highlights: string[] }
// Highlights split on the first ": " into a bold title and a description.
const workExperience = [
  {
    role: 'Software & AI Integration Intern',
    company: 'Infinix Innovations - Dubai, UAE',
    date: '2026 - Present',
    logoPath: '/images/logos/infinix_innovations_logo.webp',
    summary:
      'Building real-time AI systems for live exhibitions and automating internal business workflows — from conversational video avatars and computer-vision installations to RAG voice assistants and sales automation.',
    highlights: [
      'Real-Time AI Video Avatars: Built a locally hosted conversational chatbot with a live-streaming video avatar. The pipeline links local LLMs to a text-to-speech engine and lip-syncs the avatar to the generated audio in real time.',
      'Interactive Exhibition Systems: Developed and deployed 15+ zero-downtime, multi-display applications, including immersive VR and high-traffic UI systems in Unity and TouchDesigner, which handled 30,000+ live visitor interactions at industry exhibitions.',
      'Computer Vision Pipelines: Built real-time generative computer-vision workflows with StreamDiffusion, ComfyUI and TensorRT, tuning inference latency so live camera feeds turn into interactive AI art at event installations.',
      'RAG Voice Assistants: Developed retrieval-augmented voice assistants that connect vector databases and LLMs to 3D avatars, served over WebSockets and REST to React/Next.js front-ends.',
      'Process Automation: Built internal automation with n8n, Python and webhooks, including a quotation generator and automated CRM follow-ups that cut manual sales work.',
    ],
  }
];

const education = {
  degree: 'B.Sc. International Business Information Systems',
  school: 'Furtwangen University (HFU)',
  location: 'Germany',
  note: 'A degree that sits between business and computing — the reason I measure my work in outcomes, not just model scores.',
};

const socialImgs = [
  {
    name: 'github',
    url: 'https://github.com/Shahmir-Zaman',
    imgPath: '/images/github-mark-white.webp',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/shahmir-zaman-b90a61217',
    imgPath: '/images/linkedin.webp',
  },
];

export {
  words,
  abilities,
  socialImgs,
  techStackIcons,
  navLinks,
  webExpCards,
  aiExpCards,
  workExperience,
  education,
};
