import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import Particles from './components/Models/HeroModels/Particles.jsx'
import { useMediaQuery } from 'react-responsive'
import NavBar from './components/NavBar.jsx'
import LogoSection from './sections/LogoSection.jsx'
import FeatureCards from './sections/FeatureCards.jsx'
import TechStack from './sections/TechStack.jsx'
import Experience from './sections/Experience.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import { useRef } from 'react'

const App = () => {
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })
    const mainRef = useRef()

    return (
        <main ref={mainRef}>
            {/* NavBar needs to be in a higher z-index stacking context than the Foreground Canvas so 3D objects scroll under it */}
            <div className="relative z-[50]">
                <NavBar />
            </div>

            {/* Background Particles - Fixed behind all content (z-0) */}
            <div className="fixed inset-0 z-[0] pointer-events-none">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                    <Particles count={isMobile ? 80 : 150} />
                </Canvas>
            </div>

            {/* Main Content */}
            <div className="relative z-[10]">
                <Hero />
                <TechStack />
                <Experience />
                <ShowcaseSection />
                <FeatureCards />
                <LogoSection />
                <Contact />
                <Footer />
            </div>

            {/* Foreground Viewport - Renders 3D View portables *over* solid DOM backgrounds (z-20) */}
            <div className="fixed inset-0 z-[20] pointer-events-none">
                <Canvas eventSource={mainRef} eventPrefix="client">
                    <View.Port />
                </Canvas>
            </div>

        </main>
    )
}

export default App