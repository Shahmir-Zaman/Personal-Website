import Button from '../components/Button.jsx'
import { lazy, Suspense } from 'react'

const HeroExperience = lazy(() => import('../components/Models/HeroModels/HeroExperience.jsx'))
import { words } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AvatarWidget from '../components/AvatarWidget.jsx'
import ChatPanel from '../components/ChatPanel.jsx'
import { useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [isWidget, setIsWidget] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    // Tailwind's xl breakpoint. Only one HeroExperience may mount: a CSS-hidden copy still owns a live WebGL context.
    const isDesktop = useMediaQuery({ minWidth: 1280 });

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: "#hero",
            start: "bottom 90%",
            onEnter: () => setIsWidget(true),
            onLeaveBack: () => setIsWidget(false),
        });

        gsap.fromTo('.hero-text h1',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.inOut'
            }
        )
    })

    const handleAvatarClick = () => {
        setIsChatOpen(true);
    };

    const handleChatClose = () => {
        setIsChatOpen(false);
    };

    return (
        <section id='hero' className={`relative overflow-hidden ${isChatOpen ? 'chat-active' : ''}`}>
            {/* Background Image */}
            <div className='absolute top-0 left-0 z-10 '>
                <img src="/images/bg.webp" alt="" className="w-full h-full object-cover scale-150" loading="eager" />
            </div>

            <div className='hero-layout'>

                {/* LEFT: HERO CONTENT */}
                <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5'>
                    <div className='flex flex-col gap-7'>

                        {/* The slider repeats its words for a seamless loop, so the visual
                            copy is hidden from assistive tech and replaced by one sentence. */}
                        <h1 className='hero-text'>
                            <span className="sr-only">Turning data, AI, code and ideas into measurable business results</span>
                            <span aria-hidden="true">
                                Turning
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center md:gap-2 gap-1 pb-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt=""
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </span>
                            <span aria-hidden="true">into Measurable</span>
                            <span aria-hidden="true">Business Results</span>
                        </h1>

                        <p className='text-white-50 md:text-xl relative z-10 pointer-events-none mt-3 max-w-xl leading-relaxed'>
                            I'm Shahmir Zaman, a software and AI engineer with a B.Sc. in International
                            Business Information Systems, based in Germany and the UAE. I build ML models,
                            automations and full-stack apps, and explain what they're worth to the people who decide.
                        </p>

                        {/* Proof before promise: the strongest real result on the site, one click
                            from the case study that backs it. Team work, hence "our". */}
                        <a href="#mlcasestudy" className="hero-proof group">
                            <span className="hero-proof-figure">€126,520 saved per production batch</span>
                            <span className="text-white-50/80">
                                in our SmartBuild ML case study, pitched to the <span className="whitespace-nowrap">CEO &amp; CTO <span aria-hidden="true" className="hero-proof-arrow">→</span></span>
                            </span>
                        </a>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-3 mb-2">
                            <Button
                                className="md:w-80 md:h-16 w-60 h-12"
                                id="button"
                                text="See My Work"
                            />
                            <a href="#contact" className="hero-secondary-cta">Get in touch</a>
                            <a
                                href="/cv/Shahmir_Zaman_CV.pdf"
                                download="Shahmir_Zaman_CV.pdf"
                                className="hero-cv-link"
                            >
                                Download CV
                            </a>
                        </div>

                        {/* 3D SCENE - MOBILE/TABLET (below button on smaller screens) */}
                        {!isDesktop && <div className="w-full h-[34vh] min-h-64">
                            <Suspense fallback={<div className="w-full h-full bg-black-100 rounded-lg flex items-center justify-center">
                                <div className="text-white-50">Loading 3D Scene...</div>
                            </div>}>
                                <HeroExperience isWidget={isWidget} isChatOpen={isChatOpen} onAvatarClick={handleAvatarClick} />
                            </Suspense>
                        </div>}

                    </div>
                </header>

                {/* RIGHT: HERO 3D SCENE - DESKTOP ONLY */}
                {isDesktop && <figure>
                    <div className='hero-3d-layout mt-2 w-250'>
                        <Suspense fallback={<div className="w-full h-full bg-black-100 rounded-lg flex items-center justify-center">
                            <div className="text-white-50">Loading 3D Scene...</div>
                        </div>}>
                            <HeroExperience isWidget={isWidget} isChatOpen={isChatOpen} onAvatarClick={handleAvatarClick} />
                        </Suspense>
                    </div>
                </figure>}

            </div>

            {/* Avatar overlay - positioned absolutely within the hero section */}
            <AvatarWidget isWidget={isWidget} onAvatarClick={handleAvatarClick} isChatOpen={isChatOpen} />

            {/* Chat Panel */}
            <ChatPanel isOpen={isChatOpen} onClose={handleChatClose} />
        </section>
    )
}

export default Hero

