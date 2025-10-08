import { logoIconsList } from '../constants'
import React from 'react'

const LogoIcon = ({ icon }) => {
    return (
        <div className='flex-none flex-center marquee-item'>
            <img src={icon.imgPath} alt={icon.imgName}></img>
        </div>
    )
}


const LogoSection = () => {
    return (
        <div className='md:my-20 my-10 relative'>
            <div className='gradient-edge' />
            <div className='gradient-edge' />

            <div className='marquee h-20'>
                <div className='marquee-box md:gap-12 gap-5'>
                    {logoIconsList.map((icon) => (
                        <LogoIcon key={icon.name} icon={icon} />
                    ))}

                    {logoIconsList.map((icon) => (
                        <LogoIcon key={icon.name} icon={icon} />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default LogoSection