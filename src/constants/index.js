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

const logoIconsList = [
  {
    imgPath: '/images/logos/company-logo-1.png',
  },
  {
    imgPath: '/images/logos/company-logo-2.png',
  },
  {
    imgPath: '/images/logos/company-logo-3.png',
  },
  {
    imgPath: '/images/logos/company-logo-4.png',
  },
  {
    imgPath: '/images/logos/company-logo-5.png',
  },
  {
    imgPath: '/images/logos/company-logo-6.png',
  },
  {
    imgPath: '/images/logos/company-logo-7.png',
  },
  {
    imgPath: '/images/logos/company-logo-8.png',
  },
  {
    imgPath: '/images/logos/company-logo-9.png',
  },
  {
    imgPath: '/images/logos/company-logo-10.png',
  },
  {
    imgPath: '/images/logos/company-logo-11.png',
  },
];

const abilities = [
  {
    imgPath: '/images/Abilities/code.png',
    title: 'Full-Stack Development',
    desc: 'Designing and building end-to-end applications with MERN, REST APIs, and responsive UIs using clean, scalable code.',
  },
  {
    imgPath: '/images/Abilities/ai.png',
    title: 'AI & Automation',
    desc: 'Integrating AI-powered features and orchestrating workflows with APIs, LLMs, and tools like n8n for smarter solutions.',
  },
  {
    imgPath: '/images/Abilities/cloud.png',
    title: 'Cloud Deployment',
    desc: 'Deploying and managing applications on AWS & GCP with CI/CD pipelines, DNS, and SSL for production-ready reliability.',
  },
  {
    imgPath: '/images/Abilities/db.png',
    title: 'Database Design',
    desc: 'Structuring and managing data with MySQL, PostgreSQL, Prisma, and MongoDB for robust, efficient storage solutions.',
    size: 11, // Larger size for this one
  },
  {
    imgPath: '/images/Abilities/problem.png',
    title: 'Problem-Solving',
    desc: 'Breaking down complex challenges with creativity and logic to deliver efficient, reliable, and innovative results.',
  },
  {
    imgPath: '/images/Abilities/team.png',
    title: 'Collaboration & Communication',
    desc: 'Thriving in team environments by sharing knowledge, listening actively, and ensuring transparency in every project.',
  },
];

const techStackImgs = [
  {
    name: 'React Developer',
    imgPath: '/images/logos/react.png',
  },
  {
    name: 'Python Developer',
    imgPath: '/images/logos/python.svg',
  },
  {
    name: 'Backend Developer',
    imgPath: '/images/logos/node.png',
  },
  {
    name: 'Interactive Developer',
    imgPath: '/images/logos/three.png',
  },
  {
    name: 'Project Manager',
    imgPath: '/images/logos/git.svg',
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

const expCards = [
  {
    title: 'AI-Enhanced Note-Taking App (Notery)',
    imgPath: '/images/experience/notery.jpg',
    logoPath: '/images/logos/Notery_Logo_Light.png',
    responsibilities: [
      'Developed a server-rendered note app with Next.js (App Router), React, and TypeScript.',
      'Designed a relational schema with Prisma and Supabase PostgreSQL, exposing typesafe RESTful CRUD APIs.',
      'Integrated the OpenAI API to auto-generate contextual responses, persisted alongside user notes.',
      'Built an accessible, responsive UI with Tailwind CSS, shadcn/ui, and Radix components.',
    ],
  },
  {
    title: 'Full-Stack Listing Platform (RoamAura)',
    imgPath: '/images/experience/roamaura.jpg',
    logoPath: '/images/logos/Roamaura.svg',
    responsibilities: [
      'Architected a server-rendered fullstack platform with Node.js, Express, MongoDB, and EJS templates.',
      'Developed a RESTful backend with modular controllers and routes for property listings and user management.',
      'Implemented Passport.js authentication with express-session and connect-mongo for secure sessions.',
      'Validated Mongoose schemas and built Joi-based middleware for robust input handling.',
    ],
  },
  {
    title: 'AI Document Summarizer (SumAI)',
    imgPath: '/images/experience/sumai.jpg',
    logoPath: '/images/logos/SumAI.png',
    responsibilities: [
      'Architected a fullstack AI document summarizer with React, TypeScript, Vite, and Tailwind CSS.',
      'Deployed & orchestrated a self-hosted n8n workflow on GCP for automated PDF/TXT processing and summarization with Llama 3.2.',
      'Integrated drag-and-drop uploads, file validation, and progress tracking with React Context + useReducer.',
      'Hardened the pipeline for scalability and reliability, streamlining end-to-end AI document processing.',
    ],
  },
];

const socialImgs = [
  {
    name: 'github',
    url: 'https://github.com/Shahmir-Zaman',
    imgPath: '/images/github-mark-white.png',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/shahmir-zaman-b90a61217',
    imgPath: '/images/linkedin.png',
  },
];

export {
  words,
  abilities,
  logoIconsList,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  expCards,
};
