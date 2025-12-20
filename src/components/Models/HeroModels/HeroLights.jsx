import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';

const HeroLights = () => {
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
        </group>
    );
};

export default HeroLights;