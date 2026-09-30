import { navLinks } from '../constants'
import React, { useEffect, useState } from 'react'

const projectSubLinks = [
  { name: 'SmartBuild Case Study', link: '#mlcasestudy' },
  { name: 'Live Projects', link: '#projects' },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
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

  const handleScrollTo = (e, link) => {
    e.preventDefault();
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    if (isMenuOpen) {
      closeMenu();
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
      <div className='inner'>
        <a className='logo ' href='#hero' onClick={(e) => handleScrollTo(e, '#hero')}>
          Shahmir Zaman
        </a>
        <nav className='desktop'>
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className={`group ${name === 'Projects' ? 'relative' : ''}`}>
                {name === 'Projects' ? (
                  /* Projects with hover submenu */
                  <>
                    <a
                      href={link}
                      className="block transform transition-transform duration-300 hover:scale-105"
                      onClick={(e) => handleScrollTo(e, link)}
                    >
                      <span>{name}</span>
                      <span className="underline" />
                    </a>
                    {/* Hover submenu */}
                    <div className="nav-submenu">
                      {projectSubLinks.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.link}
                          onClick={(e) => handleScrollTo(e, sub.link)}
                          className="block px-6 py-3 text-sm text-white-50 hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={link}
                    className="block transform transition-transform duration-300 hover:scale-105"
                    onClick={(e) => handleScrollTo(e, link)}
                  >
                    <span>{name}</span>
                    <span className="underline" />
                  </a>
                )}
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

          <a className='contact-btn group' href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>
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
                  <div key={name}>
                    <a
                      href={link}
                      onClick={(e) => handleScrollTo(e, link)}
                      className="block px-4 py-3 text-white-50 hover:text-white hover:bg-black-50 active:bg-black-200 active:scale-95 transition-all duration-150 transform"
                    >
                      {name}
                    </a>
                    {name === 'Projects' && (
                      <div className="pl-6 border-l border-white/10 ml-4">
                        {projectSubLinks.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.link}
                            onClick={(e) => handleScrollTo(e, sub.link)}
                            className="block px-4 py-3 text-sm text-white-50/70 hover:text-white hover:bg-black-50 transition-all duration-150"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
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
                  onClick={(e) => handleScrollTo(e, '#contact')}
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
