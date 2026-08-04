import { abilities } from '../constants'
import React from 'react'

const FeatureCards = () => {
    return (

        <div className='w-full padding-x-lg' id='skills'>
            <h2 className="font-semibold md:text-5xl text-3xl text-center pb-15 pt-7">
                Skills
            </h2>
            <div className='mx-auto grid-3-cols'>
                {abilities.map(({ imgPath, title, desc, size = 40 }) => (
                    <div key={title} className='card-border rounded-xl p-8 flex flex-col gap-6 hover:scale-105 transition-transform duration-300'>
                        <div className='size-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm'>
                            {/* Sized inline, not via `size-${size}`: Tailwind cannot see
                                interpolated class names, so those utilities were never
                                generated and every icon fell back to intrinsic size. */}
                            <img src={imgPath} alt="" style={{ width: size, height: size }} className='object-contain' />
                        </div>
                        <div className='space-y-3'>
                            <h3 className='text-white text-2xl font-semibold leading-tight'>{title}</h3>
                            <p className='text-white-50 text-lg leading-relaxed'>{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureCards
