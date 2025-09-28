import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'
import { Canvas } from '@react-three/fiber'
import Particles from './components/HeroModels/Particles.jsx'
import { useMediaQuery } from 'react-responsive'
import NavBar from './components/NavBar.jsx'
import LogoSection from './components/LogoSection.jsx'
import FeatureCards from './sections/FeatureCards.jsx'

const App = () => {
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })
    
    return (
        <>
            {/* Background Particles - Fixed behind all content */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                    <Particles count={isMobile ? 80 : 150} />
                </Canvas>
            </div>
            
            {/* Main Content */}
            <div className="relative z-10">
                <NavBar/>
                <Hero />
                <ShowcaseSection />
                <LogoSection/>
                <FeatureCards/>
            </div>
        </>
    )
}

export default App