const navLinks = [
  {
    name: 'Tech Stack',
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

  {
    name: 'Skills',
    link: '#skills',
  },
];

const words = [
  { text: 'Ideas', imgPath: '/images/ideas.svg' },
  { text: 'Concepts', imgPath: '/images/concepts.svg' },
  { text: 'Designs', imgPath: '/images/designs.svg' },
  { text: 'Code', imgPath: '/images/code.svg' },
  { text: 'Ideas', imgPath: '/images/ideas.svg' },
  { text: 'Concepts', imgPath: '/images/concepts.svg' },
  { text: 'Designs', imgPath: '/images/designs.svg' },
  { text: 'Code', imgPath: '/images/code.svg' },
];

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
    size: 44, // px — this glyph reads small at the default 40
  },
  {
    imgPath: '/images/Abilities/problem.webp',
    title: 'Problem-Solving',
    desc: 'Breaking down complex challenges with creativity and logic to deliver efficient, reliable, and innovative results.',
  },
  {
    imgPath: '/images/Abilities/team.webp',
    title: 'Collaboration & Communication',
    desc: 'Thriving in team environments by sharing knowledge, listening actively, and ensuring transparency in every project.',
  },
];


const techStackIcons = [
  {
    name: 'Full-Stack Developer',
    modelPath: '/models/react_logo-transformed.glb',
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: 'Python & ML Engineer',
    modelPath: '/models/python-transformed.glb',
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: 'Cloud Deployment (AWS/GCP)',
    modelPath: '/models/Cloud.glb',
    scale: 0.9,
    rotation: [0, 0, 0],
  },
  {
    name: 'Database Specialist',
    modelPath: '/models/Database.glb',
    scale: 0.9,
    rotation: [0, 0, 0],
    position: [0, 1.2, 0],
  },
  {
    name: 'API Developer',
    modelPath: '/models/API.glb',
    scale: 1,
    rotation: [0, 0, 0],
  },
];

// Project Quickview cards are an index, not a case study: `kind`, `summary`,
// `stack` and `highlight` are what render, and they are deliberately short
// enough to skim in a few seconds. `detailHref` points at that project's full
// treatment further down the page — its Featured Projects card, or the ML Case
// Study section for SmartBuild, which has no Featured Projects card.
//
// `responsibilities` is NOT rendered. It stays here as the long-form detail fed
// to the AI assistant's knowledge base via lib/shahmirProfile.js, so the
// assistant keeps the depth the cards give up.
const webExpCards = [
  {
    title: 'RoamAura',
    kind: 'Full-Stack Listing Platform',
    summary: 'A server-rendered rental marketplace with authenticated sessions, property listings, and validated user input.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Passport.js', 'EJS'],
    highlight: 'Modular REST backend with Joi-validated middleware',
    detailHref: '#project-roamaura',
    logoPath: '/images/logos/Roamaura.svg',
    responsibilities: [
      'Architected a server-rendered fullstack platform with Node.js, Express, MongoDB, and EJS templates.',
      'Developed a RESTful backend with modular controllers and routes for property listings and user management.',
      'Implemented Passport.js authentication with express-session and connect-mongo for secure sessions.',
      'Validated Mongoose schemas and built Joi-based middleware for robust input handling.',
    ],
  },
  {
    title: 'SumAI',
    kind: 'AI Document Summarizer',
    summary: 'Upload a PDF or TXT file and get a structured summary back, processed end to end by a self-hosted LLM pipeline.',
    stack: ['React', 'TypeScript', 'Vite', 'n8n', 'GCP', 'Llama 3.2'],
    highlight: 'Self-hosted n8n + Llama 3.2 workflow running on GCP',
    detailHref: '#project-sumai',
    logoPath: '/images/logos/SumAI.webp',
    responsibilities: [
      'Architected a fullstack AI document summarizer with React, TypeScript, Vite, and Tailwind CSS.',
      'Deployed & orchestrated a self-hosted n8n workflow on GCP for automated PDF/TXT processing and summarization with Llama 3.2.',
      'Integrated drag-and-drop uploads, file validation, and progress tracking with React Context + useReducer.',
      'Hardened the pipeline for scalability and reliability, streamlining end-to-end AI document processing.',
    ],
  },
  {
    title: 'Notery',
    kind: 'AI-Enhanced Note-Taking App',
    summary: 'Notes with AI-generated contextual responses saved alongside them, on a typesafe Postgres backend.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'OpenAI'],
    highlight: 'Accessible, responsive UI built on Radix primitives',
    detailHref: '#project-notery',
    logoPath: '/images/logos/Notery_Logo_Light.webp',
    responsibilities: [
      'Developed a server-rendered note app with Next.js (App Router), React, and TypeScript.',
      'Designed a relational schema with Prisma and Supabase PostgreSQL, exposing typesafe RESTful CRUD APIs.',
      'Integrated the OpenAI API to auto-generate contextual responses, persisted alongside user notes.',
      'Built an accessible, responsive UI with Tailwind CSS, shadcn/ui, and Radix components.',
    ],
  }
];

const aiExpCards = [
  {
    title: 'SmartBuild',
    kind: 'Predictive Quality Assurance',
    // Team engagement — PRODUCT.md is explicit that copy must not imply sole
    // authorship, so the summary names the team up front.
    summary: 'A consulting engagement with two teammates, pitched to SmartBuild’s CEO and CTO: models that catch defective raw material before it reaches production.',
    stack: ['Python', 'XGBoost', 'Polynomial Regression'],
    highlight: '€126,520 net savings per production batch',
    metric: true,
    detailHref: '#mlcasestudy',
    logoPath: '/images/logos/company-logo-3.webp',
    responsibilities: [
      'Worked in a three-person team on a predictive quality assurance pipeline, migrating from Linear to Polynomial Regression to eliminate residual bias and achieve an R² > 0.99.',
      'Developed an XGBoost classification model acting as a material "Gatekeeper" to identify and discard defective raw materials before production.',
      'Translated technical metrics into business ROI, generating a net savings of €126,520 per production batch by reducing defect-related losses by over 80%.'
    ],
  }
];

// Confirmed employment. Shape: { role, company, date, logoPath, highlights: string[] }
const workExperience = [
  {
    role: 'Software & AI Integration Engineer',
    company: 'Infinix Innovations - Dubai, UAE',
    date: '2026 - Present',
    logoPath: '/images/logos/infinix_innovations_logo.webp',
    highlights: [
      'Specialist in engineering real-time applications, generative AI architectures, and process automation. Recognized for bridging complex interactive front-ends with autonomous back-end workflows to scale both user engagement and internal operations.',
      'Software & Web Engineering: Developed 15+ zero-downtime, multi-display applications (including immersive VR and high-traffic Touch/UI systems) that successfully handled 30,000+ live user interactions at premier industry events.',
      'AI Integration: Engineered real-time generative computer vision pipelines (NVIDIA SDK, Stream Diffusion, ComfyUI) and autonomous RAG-based voice assistants driven by large language models, custom vector databases, and interactive 3D avatars.',
      'Process Automation: Architecting internal business automation workflows, including a custom quotation automizer and intelligent client follow-up systems designed to streamline sales pipelines and reduce manual overhead.',
    ],
  }
];

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
};
