import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Download, Maximize2, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

// Slides live in public/images/projects/smartbuild/
const slides = Array.from({ length: 12 }, (_, i) => `/images/projects/smartbuild/slide${i + 1}.webp`);

const intro = <>Acting as <strong className="text-white font-semibold">data science consultants</strong>, my team was brought in to optimize <strong className="text-white font-semibold">SmartBuild's</strong> manufacturing line and pitch the solution directly to their CEO and CTO. The brief was pointed: don't just write code — prove real business value. We split it into two problems.</>;

// `tone` is the direction the number moved, not whether the outcome was good:
// a cut in defect costs is excellent news but reads as a decrease, so it takes
// the down colour. The label carries the meaning; the colour carries the sign.
const metrics = [
    { value: "€126,520", label: "Net savings per batch", tone: "up" },
    { value: "0.99+", label: "Model accuracy (R²)", tone: "flat" },
    { value: "−83%", label: "Cut in defect costs", tone: "down" },
];

// Both are pulled a step off the raw palette values so they read as considered
// rather than as status LEDs — desaturated toward the page instead of glowing
// off it. Neutral stays plain white so it never competes with the two signed
// figures.
const TONE_COLOR = {
    up: '#3ea56b',
    flat: '#ffffff',
    down: '#c96475',
};

// Inline reference that points a phrase at a specific deck slide: italic,
// tooltip on hover, and clicking jumps the carousel to that slide.
const SlideRef = ({ slide, onGo, children }) => (
    <span className="relative group/ref">
        <button
            type="button"
            onClick={() => onGo(slide)}
            className="-m-2 p-2 italic font-medium text-soft-cyan underline decoration-dotted decoration-soft-cyan/50 underline-offset-2 hover:text-beacon hover:decoration-beacon transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-beacon rounded-sm"
        >
            {children}
        </button>
        <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30 whitespace-nowrap rounded-md bg-black/95 border border-beacon/30 px-2 py-1 text-xs font-normal not-italic text-soft-cyan opacity-0 group-hover/ref:opacity-100 transition-opacity duration-200 shadow-lg"
        >
            See slide {slide} ↗
        </span>
    </span>
);

const buildStoryBeats = (goToSlide) => [
    {
        step: "Task 01 — Quality Assurance",
        title: "Predicting Weight Before It's Built",
        body: <>To guarantee product consistency, we first had to predict a unit's final weight from the machine's input settings. A <strong className="text-white font-semibold">Linear Regression</strong> scored an R² of 0.98 — great on paper, but its <SlideRef slide={4} onGo={goToSlide}>residuals</SlideRef> hid a systematic U-shape bias. The cause: physical volume is multiplicative (length × width × height), so a straight-line model can't capture the machine's physics. Moving to <SlideRef slide={5} onGo={goToSlide}>Polynomial Regression</SlideRef> erased that bias and lifted accuracy past R² 0.99 — letting SmartBuild certify quality mathematically, before a single unit ships.</>,
    },
    {
        step: "Task 02 — The Profit Driver",
        title: "Stopping Defects at the Source",
        body: <>This is where the real ROI lived. A faulty finished product costs <SlideRef slide={2} onGo={goToSlide}>€150 in wasted material and machine time</SlideRef>, while catching the bad raw material <em>before</em> production costs just <SlideRef slide={2} onGo={goToSlide}>€10</SlideRef>. We trained an <SlideRef slide={9} onGo={goToSlide}>XGBoost classifier</SlideRef> as a "Gatekeeper" that flags defect-prone inputs at the entry stage, so they never reach the machine — cutting the per-batch defect bill from <SlideRef slide={10} onGo={goToSlide}>€151,650 down to ~€25,000</SlideRef>.</>,
    },
];

const takeaway = <>The lesson that stuck: clean, accurate models matter — but solving the <strong className="text-soft-cyan font-semibold">right business problem</strong> is what actually keeps the lights on.</>;

const MLCaseStudy = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const viewerRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [pulse, setPulse] = useState(false);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Jump the carousel to a 1-indexed slide, bring it into view, and flash it.
    const goToSlide = (slideNumber) => {
        const index = Math.min(Math.max(slideNumber - 1, 0), slides.length - 1);
        setCurrentSlide(index);
        viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setPulse(true);
        window.setTimeout(() => setPulse(false), 1400);
    };

    const storyBeats = buildStoryBeats(goToSlide);

    const openLightbox = () => setIsLightboxOpen(true);
    const closeLightbox = () => setIsLightboxOpen(false);

    const handleViewerKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
        }
    };

    // While the lightbox is open: lock body scroll and wire up global keys.
    useEffect(() => {
        if (!isLightboxOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowRight') nextSlide();
            else if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isLightboxOpen]);

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
        <section ref={sectionRef} id="mlcasestudy" className="w-full md:mt-40 mt-20 section-padding xl:px-0 relative overflow-hidden pointer-events-auto z-10">
            {/* Background glow to integrate with the cyber theme */}

            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Predictive Quality Assurance"
                    sub="Featured Data Science Case Study"
                />

                <div ref={contentRef} className="mt-16 max-w-6xl mx-auto bg-black-200/40 p-6 md:p-10 rounded-2xl border border-white-100/10 backdrop-blur-[2px]">

                    {/* The brief — context before the numbers */}
                    <p className="text-white-50 text-base md:text-lg leading-relaxed font-light mb-8 max-w-3xl">{intro}</p>

                    {/* Headline metrics — the payoff up front */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        {metrics.map((metric) => (
                            // One surface for all three. The euros carry Impact Green
                            // because they are the business outcome; the two supporting
                            // technical figures are set in plain white so they do not
                            // compete with it. No glows, and no coloured side bar.
                            <div
                                key={metric.label}
                                className="p-5 rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20"
                            >
                                <span
                                    className="block text-3xl md:text-4xl font-bold tracking-tight"
                                    style={{ color: TONE_COLOR[metric.tone] }}
                                >{metric.value}</span>
                                <span className="block mt-1 text-blue-50 text-xs md:text-sm uppercase tracking-wider font-semibold">{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* Left: the story, problem → solution */}
                        <div className="flex flex-col gap-8">
                            {storyBeats.map((beat) => (
                                <div key={beat.step}>
                                    <p className="text-beacon/80 font-mono text-xs uppercase tracking-widest mb-2">{beat.step}</p>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{beat.title}</h3>
                                    <p className="text-white-50 text-base leading-relaxed font-light">{beat.body}</p>
                                </div>
                            ))}

                            <div className="flex mt-2">
                                <a
                                    href="/files/SmartBuild_Optimization_Case_Study.pdf"
                                    download
                                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-md border border-white/10 cyber-button-glow hover:text-beacon"
                                >
                                    <Download size={20} />
                                    <span className="text-sm md:text-base">Download Full Case Study</span>
                                </a>
                            </div>
                        </div>

                        {/* Right: slide viewer */}
                        <div className="flex flex-col gap-4">
                            <div
                                ref={viewerRef}
                                className={`slide-viewer-container relative w-full aspect-[16/10] rounded-xl bg-[#0F1115] overflow-hidden border shadow-2xl group flex items-center justify-center cursor-zoom-in transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-beacon/60 ${pulse ? 'border-beacon ring-2 ring-beacon/70 ring-offset-2 ring-offset-black-200' : 'border-white/5'}`}
                                tabIndex={0}
                                role="button"
                                aria-label="Case study presentation slides — click to enlarge"
                                onClick={openLightbox}
                                onKeyDown={handleViewerKeyDown}
                            >
                                {/* Intentional fallback layer, covered once slides load */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px]">
                                    <span className="text-white-50/30 text-xs font-mono tracking-widest uppercase">Presentation preview</span>
                                </div>

                                {slides.map((slide, i) => (
                                    <img
                                        key={slide}
                                        src={slide}
                                        alt={`Case study slide ${i + 1} of ${slides.length}`}
                                        loading="lazy"
                                        className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    />
                                ))}

                                {/* Expand affordance */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); openLightbox(); }}
                                    aria-label="Enlarge slide"
                                    className="absolute top-3 left-3 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-md border border-white/10 opacity-100 md:opacity-60 group-hover:opacity-100 hover:bg-beacon hover:text-black transition-all"
                                >
                                    <Maximize2 size={16} />
                                </button>

                                {/* Slide counter */}
                                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white-50 text-xs font-mono tracking-widest pointer-events-none">
                                    {currentSlide + 1} / {slides.length}
                                </div>

                                {/* Prev / next controls — always discoverable, brighter on hover */}
                                <div className="absolute inset-0 flex items-center justify-between px-3 z-20 opacity-100 md:opacity-60 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                        aria-label="Previous slide"
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-beacon hover:text-black transition-all hover:scale-110 pointer-events-auto"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                        aria-label="Next slide"
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-beacon hover:text-black transition-all hover:scale-110 pointer-events-auto"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Pagination dots with a touch-friendly hit area */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex z-20 pointer-events-auto">
                                    {slides.map((slide, i) => (
                                        <button
                                            key={slide}
                                            onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                                            aria-label={`Go to slide ${i + 1}`}
                                            aria-current={i === currentSlide}
                                            className="min-w-[44px] min-h-[44px] flex items-center justify-center group/dot"
                                        >
                                            <span className={`block h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-beacon w-6 md:w-8' : 'bg-white/40 group-hover/dot:bg-white/60 w-2'}`}></span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-center text-white-50/80 text-xs md:text-sm font-light">The full deck, as presented to SmartBuild's CEO &amp; CTO — click any slide to enlarge</p>
                        </div>

                    </div>

                    {/* Closing takeaway */}
                    <p className="mt-10 pt-6 border-t border-white/10 text-white-50 text-base md:text-lg leading-relaxed font-light text-center max-w-3xl mx-auto">{takeaway}</p>
                </div>
            </div>

            {/* Fullscreen lightbox — portalled to body so it clears the section's overflow + 3D canvases */}
            {isLightboxOpen && createPortal(
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Case study slide ${currentSlide + 1} of ${slides.length}, enlarged`}
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        aria-label="Close enlarged view"
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-beacon hover:text-black transition-all"
                    >
                        <X size={24} />
                    </button>

                    {/* Enlarged slide — stop propagation so clicking the image doesn't close */}
                    <img
                        src={slides[currentSlide]}
                        alt={`Case study slide ${currentSlide + 1} of ${slides.length}`}
                        onClick={(e) => e.stopPropagation()}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                    />

                    {/* Prev / next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        aria-label="Previous slide"
                        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-beacon hover:text-black transition-all hover:scale-110"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        aria-label="Next slide"
                        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-beacon hover:text-black transition-all hover:scale-110"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-mono tracking-widest">
                        {currentSlide + 1} / {slides.length}
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default MLCaseStudy;
