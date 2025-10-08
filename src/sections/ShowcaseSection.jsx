import { Button } from "../components/ui/button"
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
        <>
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
            <section ref={sectionRef} id="projects" className='app-showcase -mt-8'>
                <div className='w-full'>
                    <div className='showcaselayout'>

                        {/* Left - Featured Project */}
                        <div className='first-project-wrapper' ref={project1Ref}>
                            <div className='image-wrapper'>
                                <img src="/images/project1.png" alt="Notery" />
                            </div>

                            <div className='text-content'>
                                <h2>Notery</h2>
                                <p className='text-white-50 md:text-xl'>
                                    Notery is a web application that allows users to create, edit, and delete notes.
                                    It is built with React and uses the Prisma database to store the notes.
                                </p>

                                <div className='button-wrapper'>
                                    <div className="flex gap-4 mt-4">
                                        <Button variant="animated" className="btn-animated" asChild>
                                            <a href="https://notery.shahmirzaman.dev" target="_blank" rel="noreferrer">
                                                View Live
                                            </a>
                                        </Button>
                                        <Button variant="animated" className="btn-animated" asChild>
                                            <a href="https://github.com/Shahmir-Zaman/Notery" target="_blank" rel="noreferrer">
                                                View Code
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Project List */}
                        <div className='project-list-wrapper overflow-hidden'>
                            {/* Project 2 - SumAI */}
                            <div className='project !rounded-xl overflow-hidden' ref={project2Ref}>
                                <div className='image-wrapper !rounded-xl overflow-hidden'>
                                    <img src="/images/project2.png" alt="SumAI" className="!rounded-xl w-full h-full object-cover" />
                                </div>

                                <div className='text-content'>
                                    <h2>SumAI</h2>
                                    <p className='text-white-50 md:text-xl'>
                                        SumAI is an AI-powered summarization tool that helps users quickly
                                        understand long documents and articles.
                                    </p>

                                    <div className='button-wrapper'>
                                        <div className="flex gap-4 mt-4 mr-4">
                                            <Button variant="animated" className="btn-animated" asChild>
                                                <a href="https://sumai.shahmirzaman.dev" target="_blank" rel="noreferrer">
                                                    View Live
                                                </a>
                                            </Button>
                                            <Button variant="animated" className="btn-animated" asChild>
                                                <a href="https://github.com/Shahmir-Zaman/SumAI" target="_blank" rel="noreferrer">
                                                    View Code
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project 3 - RoamAura */}
                            <div className='project !rounded-xl overflow-hidden' ref={project3Ref}>
                                <div className='image-wrapper !rounded-xl overflow-hidden'>
                                    <img src="/images/project3.png" alt="RoamAura" className="!rounded-xl w-full h-full object-cover" />
                                </div>

                                <div className='text-content'>
                                    <h2>RoamAura</h2>
                                    <p className='text-white-50 md:text-xl'>
                                        RoamAura is a modern web platform for discovering, listing, and managing
                                        unique rental properties worldwide.
                                    </p>

                                    <div className='button-wrapper'>
                                        <div className="flex gap-4 mt-4 mr-4">
                                            <Button variant="animated" className="btn-animated" asChild>
                                                <a href="https://roamaura.shahmirzaman.dev" target="_blank" rel="noreferrer">
                                                    View Live
                                                </a>
                                            </Button>
                                            <Button variant="animated" className="btn-animated" asChild>
                                                <a href="https://github.com/Shahmir-Zaman/Roamaura" target="_blank" rel="noreferrer">
                                                    View Code
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShowcaseSection