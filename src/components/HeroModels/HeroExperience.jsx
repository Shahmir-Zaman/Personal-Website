import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive';
import HeroLights from './HeroLights';
import Particles from './Particles';
import ExpRoom from './Experimental Room';


const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: '(max-width:1025px' });
  const isMobile = useMediaQuery({ query: '(max-width:768px' });

  return (
    <div className="w-full h-full relative">
      {/* R3F Canvas - Particles Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <HeroLights />
          <Particles count={isMobile ? 50 : 100} />
        </Canvas>
      </div>

      {/* Spline Canvas - Interactive 3D Scene on top */}
      <div className="absolute inset-0 z-20" style={{ background: 'transparent' }}>
        <ExpRoom />
      </div>
    </div>
  )
}

export default HeroExperience