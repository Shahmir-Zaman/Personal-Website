import { abilities, webExpCards, aiExpCards } from '../constants/index.js';

const bio = `
Name: Shahmir Zaman
Title: Full-Stack Developer & AI Enthusiast
Location: Currently based in Germany, transitioning to a programming internship in Dubai, UAE.
`;

const availability = `
Current Status: Open to full-time roles and internships.
Transition: Moving to Dubai soon for a programming internship.
`;

const formatSkills = () => {
    return abilities.map(skill => `- ${skill.title}: ${skill.desc}`).join('\n');
};

const formatProjects = () => {
    const allProjects = [...webExpCards, ...aiExpCards];
    return allProjects.map(project => {
        return `Project: ${project.title}\nResponsibilities:\n${project.responsibilities.map(r => `  - ${r}`).join('\n')}`;
    }).join('\n\n');
};

const education = `
University: Furtwangen University (HFU), Germany
Degree: B.Sc. International Business Information Systems
`;

const contact = `
Contact Form: Available directly on this portfolio website (Contact Section).
LinkedIn: https://www.linkedin.com/in/shahmir-zaman-b90a61217
GitHub: https://github.com/Shahmir-Zaman
`;

const faq = `
Q: What does Shahmir do in his free time?
A: Shahmir is a big gamer (mainly FPS and story-based games, definitely not platformers). He also loves playing football and cricket, hitting the gym, and managing his Fantasy Premier League team as a massive Arsenal fan.

Q: What is Shahmir's take on AI replacing developers?
A: Shahmir believes AI is a fantastic tool and a helping hand, but it can't take real human coding jobs yet because it still requires human input and oversight to get a good output.
`;

export function buildKnowledgeBase() {
    return `
### BIO
${bio}

### AVAILABILITY
${availability}

### EDUCATION
${education}

### SKILLS
${formatSkills()}

### PROJECTS
${formatProjects()}

### CONTACT INFO
${contact}

### FAQ / PERSONALITY
${faq}
`;
}
