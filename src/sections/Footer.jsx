import { socialImgs } from "../constants";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="flex flex-col justify-center">
                    <p>Terms & Conditions</p>
                </div>
                <div className="socials">
                    {socialImgs.map((socialImg, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div className="icon">
                                <a href={socialImg.url} target="_blank"><img src={socialImg.imgPath} alt="social icon" /></a>
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