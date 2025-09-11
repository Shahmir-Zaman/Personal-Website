import React from 'react'

const HeroLights = () => {
  return (
    <>
        {/* Over all Light*/}
        <spotLight 
        position={[2,5,6]}
        angle={1}
        intensity={58}
        />
        {/* Lamp Light*/}
        <spotLight 
        position={[2,5,6]}
        angle={0.15}
        intensity={60}
        penumbra={0.8}
        />

    </>
  )
}

export default HeroLights