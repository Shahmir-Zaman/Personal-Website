import { navLinks } from '../constants'
import { useMediaQuery } from 'react-responsive'

import React, { useEffect, useState } from 'react'

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' }); // lg breakpoint
  
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

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
        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
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

        {/* Mobile/Tablet Dropdown */}
        <div className="lg:hidden relative">
          <button
            onClick={toggleMenu}
            className="contact-btn group"
            aria-label="Menu"
          >
            <div className='inner flex items-center justify-center'>
              {/* Hamburger Icon */}
              <div className="flex flex-col space-y-1">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-black-50 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {navLinks.map(({ link, name }) => (
                  <a
                    key={name}
                    href={link}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-white-50 hover:text-white hover:bg-black-50 active:bg-black-200 active:scale-95 transition-all duration-150 transform"
                  >
                    {name}
                  </a>
                ))}
                <hr className="border-black-50 my-2" />
                <a
                  href="/cv/Shahmir_Zaman_CV.pdf"
                  download="Shahmir_Zaman_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-white-50 hover:text-white hover:bg-black-50 active:bg-black-200 active:scale-95 transition-all duration-150 transform"
                >
                  Download My CV
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-white-50 hover:text-white hover:bg-black-50 active:bg-black-200 active:scale-95 transition-all duration-150 transform"
                >
                  Contact Me
                </a>
              </div>
            </div>
          )}
        </div>

      </div> 

    </header>
  )
}

export default NavBar