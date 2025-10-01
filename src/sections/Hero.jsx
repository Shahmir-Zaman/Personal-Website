import Button from '../components/button.jsx'
import HeroExperience from '../components/HeroModels/HeroExperience.jsx'
import { words } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo('.hero-text h1',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        durations: 1,
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
                Shapping
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

          </div>
        </header>

        {/* RIGHT: HERO 3D SCENE */}
        <figure>
          <div className='hero-3d-layout mt-2 w-250'>
            <HeroExperience />
          </div>
        </figure>

      </div>
    </section>
  )
}

export default Hero