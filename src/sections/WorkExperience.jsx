import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { workExperience } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
      // Both tweens share one start so the card and the bullets inside it
      // reveal together. They used to fire at center+=200 and center+=100,
      // which meant the card sat invisible until its top had scrolled most of
      // the way up the viewport — and the highlights lagged the card that
      // contains them, compounding into a visibly slow reveal. `top bottom-=100`
      // matches ShowcaseSection and MLCaseStudy: start as the card enters.
      const start = "top bottom-=100";

      // Card fades and slides in
      gsap.from(".work-hero-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-hero-card",
          start,
          toggleActions: "play none none reverse",
        },
      });

      // Stagger the highlight items
      gsap.from(".work-highlight-item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".work-hero-card",
          start,
          toggleActions: "play none none reverse",
        },
      });
  }, { scope: containerRef });

  const role = workExperience[0];

  return (
    <section className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5" id="experience" ref={containerRef}>
        <TitleHeader
          title="Work Experience"
          sub="My Career Overview"
        />

        <div className="mt-16 md:mt-20 mx-auto max-w-4xl">
          <div className="work-hero-card">
            {/* Header: logo + role + company */}
            <div className="flex items-center gap-5 mb-8">
              <div className="size-16 md:size-20 flex-none rounded-2xl flex justify-center items-center border border-white/10 bg-black-200/60 overflow-hidden">
                <img src={role.logoPath} alt={role.company} className="size-full object-contain p-2" loading="lazy" />
              </div>
              <div>
                <h3 className="font-bold text-2xl md:text-3xl text-white">{role.role}</h3>
                <p className="text-beacon/90 text-sm md:text-base mt-1">{role.company}</p>
                <p className="text-white-50/60 text-sm mt-1">{role.date}</p>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-beacon/30 to-transparent mb-8" />

            {/* Highlights */}
            <div className="space-y-5">
              {role.highlights.map((item, index) => (
                <div key={index} className="work-highlight-item flex gap-4 items-start">
                  <span className="mt-2 size-2 flex-none rounded-full bg-beacon/80 shadow-[0_0_8px_rgba(98,224,255,0.5)]" />
                  <p className="text-white-50 text-base md:text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
