import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import TitleHeader from "../components/TitleHeader"
import { webExpCards } from "../constants"

gsap.registerPlugin(ScrollTrigger);

const linkClass = "btn-animated inline-flex items-center justify-center min-h-11 rounded-md px-3.5 py-2.5 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm";

const ProjectCard = ({ project, featured }) => {
    const { title, kind, summary, stack, highlight, imgPath, liveUrl, repoUrl } = project;

    return (
        <article className={`${featured ? 'first-project-wrapper' : 'project-card'} project-reveal`}>
            <div className='image-wrapper'>
                <img src={imgPath} alt={`${title} screenshot`} loading="lazy" />
            </div>

            <div className='text-content'>
                <div className='space-y-2.5'>
                    <p className="project-kind">{kind}</p>
                    <h3 className={featured ? 'text-2xl md:text-3xl lg:text-4xl font-bold text-white' : 'text-xl md:text-2xl font-bold text-white'}>
                        {title}
                    </h3>
                    <p className={`text-white-50 leading-relaxed max-w-[65ch] ${featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
                        {summary}
                    </p>
                    <ul className="flex flex-wrap gap-2 pt-1" aria-label={`${title} tech stack`}>
                        {stack.map((tech) => (
                            <li key={tech} className="project-tag">{tech}</li>
                        ))}
                    </ul>
                    {highlight && (
                        <p className="project-highlight text-sm font-semibold">{highlight}</p>
                    )}
                </div>

                <div className="flex gap-3.5 pt-3">
                    <a href={liveUrl} target="_blank" rel="noreferrer" className={linkClass} aria-label={`${title}: view the live site`}>
                        View Live
                    </a>
                    <a href={repoUrl} target="_blank" rel="noreferrer" className={linkClass} aria-label={`${title}: view the code on GitHub`}>
                        View Code
                    </a>
                </div>
            </div>
        </article>
    );
};

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const [featured, ...rest] = webExpCards;

    useGSAP(() => {
        gsap.utils.toArray(".project-reveal").forEach((card) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="projects" className="section-padding scroll-mt-20">
            <TitleHeader
                title="Projects"
                sub="Live sites, public code"
            />

            <div className='app-showcase'>
                <div className='w-full max-w-5xl mx-auto showcase-grid-layout'>
                    <ProjectCard project={featured} featured />
                    <div className='bottom-projects-grid'>
                        {rest.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShowcaseSection
