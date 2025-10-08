import { navLinks } from '../constants'

import React, { useEffect, useState } from 'react'

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
      <div className='inner'>
        <a className='logo ' href='#hero'>
          Shahmir Zaman
        </a>
        <nav className='desktop'>
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className='group'>
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>

              </li>
            ))}
          </ul>

        </nav>
        <div className="flex items-center gap-3">
          <a
            className='contact-btn group'
            href="/cv/Shahmir_Zaman_CV.pdf"
            download="Shahmir_Zaman_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='inner'>
              <span>Download My CV</span>
            </div>
          </a>

          <a className='contact-btn group' href="#contact">
            <div className='inner'>
              <span>Contact Me</span>
            </div>
          </a> 
        </div>

      </div> 

    </header>
  )
}

export default NavBar