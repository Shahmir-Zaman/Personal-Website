import { socialImgs } from "../constants";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="flex flex-col justify-center">
                    {/* Was "Terms & Conditions" — plain text naming a document that
                        does not exist. It read as a link and went nowhere. A
                        colophon is true and earns the same grid cell. */}
                    <p>Built with React, Three.js &amp; GSAP</p>
                </div>
                <div className="socials">
                    {socialImgs.map((socialImg) => (
                        <div key={socialImg.name} className="flex flex-col items-center gap-2">
                            <div className="icon">
                                <a
                                    href={socialImg.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Shahmir Zaman on ${socialImg.name}`}
                                >
                                    <img src={socialImg.imgPath} alt="" />
                                </a>
                            </div>
                            <span className="text-sm text-white-50 capitalize">{socialImg.name}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Shahmir Zaman. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
