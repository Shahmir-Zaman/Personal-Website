import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const MLCaseStudy = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    
    // Placeholder paths - User should put their slides in public/images/projects/smartbuild/
    const slides = [
        "/images/projects/smartbuild/slide1.png",
        "/images/projects/smartbuild/slide2.png",
        "/images/projects/smartbuild/slide3.png"
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useGSAP(() => {
        gsap.from(contentRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    }, []);

    return (
        <section ref={sectionRef} className="w-full pb-20 relative overflow-hidden pointer-events-auto z-10">
            {/* Background elements to integrate with the cyber theme */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            
            <div className="w-full flex justify-center mt-8 mb-12">
               <div className="w-full max-w-6xl px-5 md:px-20">
                   <div className="flex flex-col text-center lg:text-left">
                       <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Featured Data Science Case Study</p>
                       <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Predictive Quality Assurance</h2>
                   </div>
               </div>
            </div>

            <div className="w-full max-w-6xl mx-auto px-5 md:px-20">
                {/* Main Dashboard Panel */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-black-200/40 p-6 md:p-10 rounded-2xl border border-white-100/10 backdrop-blur-[2px]">
                    
                    {/* Left: Executive Summary */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Eliminating Systematic Bias</h3>
                            <p className="text-white-50 text-base leading-relaxed font-light">
                                Architected an end-to-end predictive quality assurance pipeline. By migrating from Linear to Polynomial Regression, we completely flattened the U-shape residual bias, pushing our predictive accuracy beyond an <strong className="text-cyan-400 font-semibold">R² of 0.99</strong>.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">The XGBoost "Gatekeeper"</h3>
                            <p className="text-white-50 text-base leading-relaxed font-light">
                                Beyond just predicting, we stopped defects at the source. Implementing an XGBoost classification model to identify and discard bad raw materials before production drastically reduced costs from €151,650 to ~€25,000.
                            </p>
                        </div>

                        {/* The Metric Display */}
                        <div className="case-study-metric p-5 rounded-xl border border-green-500/20 bg-green-950/20 relative overflow-hidden transition-all duration-300 hover:bg-green-950/30">
                            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,1)]"></div>
                            <p className="text-white-50 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-1">Financial Impact / Batch</p>
                            <div className="flex items-baseline gap-2 flex-wrap sm:flex-nowrap">
                                <span className="text-3xl sm:text-4xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">€126,520</span>
                                <span className="text-green-400/80 text-sm sm:text-base uppercase font-bold tracking-wide">Net Savings</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex mt-2">
                           <a 
                             href="/files/SmartBuild_Optimization_Case_Study.pdf" 
                             download
                             className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-md border border-white/10 cyber-button-glow hover:text-cyan-300"
                           >
                              <Download size={20} />
                              <span className="text-sm md:text-base">Download Full Case Study</span>
                           </a>
                        </div>
                    </div>

                    {/* Right: Slide Viewer */}
                    <div className="flex flex-col gap-4">
                        <div className="slide-viewer-container relative w-full aspect-[16/10] rounded-xl bg-[#0F1115] overflow-hidden border border-white/5 shadow-2xl group flex items-center justify-center">
                            {/* Fallback pattern/text in case images aren't found yet */}
                            <div className="absolute inset-0 flex items-center justify-center text-white-50/20 text-sm font-mono tracking-widest pointer-events-none">
                                PPT_PLACEHOLDER
                            </div>

                            {/* Slides Loop */}
                            {slides.map((slide, i) => (
                                <img 
                                    key={i}
                                    src={slide}
                                    alt={`Case Study Slide ${i + 1}`}
                                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                />
                            ))}
                            
                            {/* Slide Navigator Controls */}
                            <div className="absolute inset-0 flex items-center justify-between px-3 z-20 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <button 
                                    onClick={prevSlide}
                                    className="p-1.5 md:p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-cyan-500 hover:text-black transition-all hover:scale-110 pointer-events-auto"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    className="p-1.5 md:p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-cyan-500 hover:text-black transition-all hover:scale-110 pointer-events-auto"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                            
                            {/* Pagination Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-auto">
                                {slides.map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setCurrentSlide(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-cyan-400 w-6 md:w-8 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-white/40 hover:bg-white/60'}`}
                                        aria-label={`Go to slide ${i+1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-center text-white-50/60 text-xs md:text-sm italic font-light font-mono">DIRECT PRESENTATION RENDERED FOR C-SUITE</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MLCaseStudy;
