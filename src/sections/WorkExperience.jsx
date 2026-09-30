import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { workExperience, education } from "../constants";
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
      <div className="w-full h-full md:px-20" id="experience" ref={containerRef}>
        <TitleHeader
          title="Experience & Education"
          sub="My Career Overview"
        />

        <div className="mt-16 md:mt-20 mx-auto max-w-4xl">
          <div className="work-hero-card">
            {/* Header: logo + role + company */}
            <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
              <div className="size-12 md:size-20 flex-none rounded-2xl flex justify-center items-center border border-white/10 bg-black-200/60 overflow-hidden">
                <img src={role.logoPath} alt={role.company} className="size-full object-contain p-2" loading="lazy" />
              </div>
              <div>
                <h3 className="font-bold text-xl md:text-3xl text-white leading-tight">{role.role}</h3>
                <p className="text-beacon/90 text-sm md:text-base mt-1">{role.company}</p>
                <p className="text-white-50/60 text-sm mt-1">{role.date}</p>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-beacon/30 to-transparent mb-8" />

            {/* Role Summary / Lead */}
            {role.summary && (
              <p className="work-highlight-item text-white-50/85 text-sm md:text-base leading-[1.8] mb-8 font-normal">
                {role.summary}
              </p>
            )}

            {/* Highlights */}
            <div className="space-y-6">
              {role.highlights.map((item, index) => {
                const colonIndex = item.indexOf(': ');
                const hasPrefix = colonIndex > 0 && colonIndex < 45;
                const title = hasPrefix ? item.slice(0, colonIndex + 1) : null;
                const desc = hasPrefix ? item.slice(colonIndex + 2) : item;

                return (
                  <div key={index} className="work-highlight-item flex gap-4 items-start">
                    <span className="mt-2.5 size-1.5 md:size-2 flex-none rounded-full bg-beacon/80 shadow-[0_0_8px_rgba(98,224,255,0.5)]" />
                    <p className="text-white-50/85 text-sm md:text-base leading-[1.8]">
                      {title && <span className="font-semibold text-white mr-1.5">{title}</span>}
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* A plain hairline row rather than a second glass card: the degree is
              supporting evidence for the positioning, not a peer of the role. */}
          <div className="education-row mt-10 md:mt-12">
            <p className="project-kind">Education</p>
            <h3 className="font-bold text-xl md:text-2xl text-white mt-2">{education.degree}</h3>
            <p className="text-beacon/90 text-sm md:text-base mt-1">
              {education.school} · {education.location}
            </p>
            <p className="text-white-50/85 text-sm md:text-base leading-relaxed mt-3 max-w-[65ch]">
              {education.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
