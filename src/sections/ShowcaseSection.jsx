import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    useGSAP(() => {
        // Section fade in
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Project cards animation
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];
        projects.forEach((card, index) => {
            if (card) { // Check if ref exists
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 0.3 * (index + 1),
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="scroll-mt-20">
            {/* Section Separator */}
            <div className="w-full flex justify-center py-16">
                <div className="w-full max-w-6xl px-5 md:px-20">
                    <div className="section-separator mx-auto mb-8"></div>
                    <div className="text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-white-50 md:text-xl max-w-2xl mx-auto">
                            Explore my latest projects showcasing innovative solutions and creative implementations
                        </p>
                    </div>
                </div>
            </div>

            {/*Projects Section*/}
            <div className='app-showcase -mt-8'>
                <div className='w-full max-w-5xl mx-auto'>
                    <div className='showcase-grid-layout'>

                        {/* Top - Featured Big Project (Notery) */}
                        <div id='project-notery' className='first-project-wrapper scroll-mt-28' ref={project1Ref}>
                            <div className='image-wrapper'>
                                <img src="/images/project1.webp" alt="Notery" loading="lazy" />
                            </div>

                            <div className='text-content'>
                                <h2>Notery</h2>
                                <p className='text-white-50 text-sm md:text-base leading-relaxed max-w-3xl'>
                                    Notery is a web application that allows users to create, edit, and delete notes.
                                    It is built with React and uses the Prisma database to store the notes.
                                </p>

                                <div className='button-wrapper'>
                                    <div className="flex gap-3.5 mt-3">
                                        <a href="https://notery.shahmirzaman.dev" target="_blank" rel="noreferrer"
                                            className="btn-animated inline-flex items-center justify-center rounded-md px-3.5 py-2.5 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm min-w-[40px]">
                                            View Live
                                        </a>
                                        <a href="https://github.com/Shahmir-Zaman/Notery" target="_blank" rel="noreferrer"
                                            className="btn-animated inline-flex items-center justify-center rounded-md px-3.5 py-2.5 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm min-w-[40px]">
                                            View Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom - 2-Column Grid (SumAI & RoamAura) */}
                        <div className='bottom-projects-grid'>
                            {/* Project 2 - SumAI */}
                            <div id='project-sumai' className='project-card scroll-mt-28' ref={project2Ref}>
                                <div className='image-wrapper'>
                                    <img src="/images/project2.webp" alt="SumAI" loading="lazy" />
                                </div>

                                <div className='text-content'>
                                    <h2>SumAI</h2>
                                    <p className='text-white-50 text-xs md:text-sm leading-relaxed'>
                                        SumAI is an AI-powered summarization tool that helps users quickly
                                        understand long documents and articles.
                                    </p>

                                    <div className='button-wrapper pt-1.5'>
                                        <div className="flex gap-3.5">
                                            <a href="https://sumai.shahmirzaman.dev" target="_blank" rel="noreferrer"
                                                className="btn-animated inline-flex items-center justify-center rounded-md px-3.5 py-2 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm">
                                                View Live
                                            </a>
                                            <a href="https://github.com/Shahmir-Zaman/SumAI" target="_blank" rel="noreferrer"
                                                className="btn-animated inline-flex items-center justify-center rounded-md px-3.5 py-2 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm">
                                                View Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project 3 - RoamAura */}
                            <div id='project-roamaura' className='project-card scroll-mt-28' ref={project3Ref}>
                                <div className='image-wrapper'>
                                    <img src="/images/project3.webp" alt="RoamAura" loading="lazy" />
                                </div>

                                <div className='text-content'>
                                    <h2>RoamAura</h2>
                                    <p className='text-white-50 text-xs md:text-sm leading-relaxed'>
                                        RoamAura is a modern web platform for discovering, listing, and managing
                                        unique rental properties worldwide.
                                    </p>

                                    <div className='button-wrapper pt-1.5'>
                                        <div className="flex gap-3.5">
                                            <a href="https://roamaura.shahmirzaman.dev" target="_blank" rel="noreferrer"
                                                className="btn-animated inline-flex items-center justify-center rounded-md px-3.5 py-2 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm">
                                                View Live
                                            </a>
                                            <a href="https://github.com/Shahmir-Zaman/Roamaura" target="_blank" rel="noreferrer"
                                                className="btn-animated inline-flex items-center justify-center rounded-md px-3.5 py-2 bg-[#282732] text-white hover:bg-white hover:text-black font-medium transition-colors text-xs md:text-sm">
                                                View Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShowcaseSection