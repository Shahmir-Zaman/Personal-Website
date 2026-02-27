import React from 'react';

const HeroLights = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
        </group>
    );
};

export default HeroLights;
