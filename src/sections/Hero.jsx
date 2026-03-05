import Button from '../components/Button.jsx'
import { lazy, Suspense } from 'react'

const HeroExperience = lazy(() => import('../components/Models/HeroModels/HeroExperience.jsx'))
import { words } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AvatarWidget from '../components/AvatarWidget.jsx'
import { useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [isWidget, setIsWidget] = useState(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: "#hero",
            // onLeave fires when the 'end' marker passes the scroller-end marker.
            // When the bottom of the #hero section hits 70% down from the top of the screen:
            start: "top top",
            end: "bottom 70%",
            onLeave: () => setIsWidget(true),
            onEnterBack: () => setIsWidget(false),
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

    return (
        <section id='hero' className='relative overflow-hidden'>
            {/* Background Image */}
            <div className='absolute top-0 left-0 z-10 '>
                <img src="/images/bg.png" alt="background" className="w-full h-full object-cover scale-150" />
            </div>

            <div className='hero-layout'>

                {/* LEFT: HERO CONTENT */}
                <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5'>
                    <div className='flex flex-col gap-7'>

                        {/* Hero Text with Animation */}
                        <div className='hero-text'>
                            <h1>
                                Shaping
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word) => (
                                            <span
                                                key={word.text}
                                                className="flex items-center md:gap-2 gap-1 pb-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>into Real Projects</h1>
                            <h1>that Deliver Results</h1>
                        </div>

                        {/* Description */}
                        <p className='text-white-50 md:text-xl relative z-10 pointer-events-none mt-3'>
                            Hi, I am Shahmir Zaman, a developer based in Germany with a passion in AI,
                            <br />
                            Automation, Machine Learning and Software Development.
                        </p>

                        {/* CTA Button */}
                        <Button
                            className="mb-2 md:w-80 md:h-16 w-60 h-12"
                            id="button"
                            text="See My Work"
                        />

                        {/* 3D SCENE - MOBILE/TABLET (below button on smaller screens) */}
                        <div className="xl:hidden w-full h-[50vh] mt-8">
                            <Suspense fallback={<div className="w-full h-full bg-black-100 rounded-lg flex items-center justify-center">
                                <div className="text-white-50">Loading 3D Scene...</div>
                            </div>}>
                                <HeroExperience showAvatar={!isWidget} />
                            </Suspense>
                        </div>

                    </div>
                </header>

                {/* RIGHT: HERO 3D SCENE - DESKTOP ONLY */}
                <figure className="hidden xl:block">
                    <div className='hero-3d-layout mt-2 w-250'>
                        <Suspense fallback={<div className="w-full h-full bg-black-100 rounded-lg flex items-center justify-center">
                            <div className="text-white-50">Loading 3D Scene...</div>
                        </div>}>
                            <HeroExperience showAvatar={!isWidget} />
                        </Suspense>
                    </div>
                </figure>

            </div>

            {/* Avatar overlay - positioned absolutely within the hero section */}
            <AvatarWidget isWidget={isWidget} />
        </section>
    )
}

export default Hero
