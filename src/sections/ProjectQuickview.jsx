import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { webExpCards, aiExpCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import TimelineCard from "../components/TimelineCard";

gsap.registerPlugin(ScrollTrigger);

const ProjectQuickview = () => {
  const [activeCategory, setActiveCategory] = useState("Web Dev");
  const containerRef = useRef(null);

  const activeCards = activeCategory === "Web Dev" ? webExpCards : aiExpCards;

  useGSAP(() => {
    // Clean up explicit elements inside container
    const triggerElements = gsap.utils.toArray(".expText", containerRef.current);

    // Beautiful, snappy scrub-in animation for switching tabs
    gsap.from(triggerElements, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all"
    });

    // Animate the timeline height as the user scrolls
    gsap.to(gsap.utils.toArray(".timeline", containerRef.current), {
      transformOrigin: "bottom bottom",
      ease: "none",
      scrollTrigger: {
        trigger: ".experience-list-container",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          gsap.to(".timeline", { scaleY: 1 - self.progress });
        },
      },
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [activeCategory] });

  return (
    <section
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5" id="project-quickview" ref={containerRef}>
        <TitleHeader
          title="Project Quickview"
          sub="🚀 Projects at a Glance"
        />

        {/* Aesthetic Tab UI Navigation */}
        <div className="cyber-tabs-container mt-12 flex items-center justify-center gap-12 border-b border-white/10 pb-4 relative">
          <button
            onClick={() => setActiveCategory("Web Dev")}
            className={`cyber-tab ${activeCategory === "Web Dev" ? "active" : ""}`}
          >
            Web Dev
          </button>
          <button
            onClick={() => setActiveCategory("AI & ML")}
            className={`cyber-tab ${activeCategory === "AI & ML" ? "active" : ""}`}
          >
            AI & ML
          </button>
        </div>

        <div className="mt-20 relative experience-list-container">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {activeCards.map((card, idx) => (
              <div key={card.title + idx} className="exp-card-wrapper">
                <div className="xl:w-1/6">
                </div>
                <div className="xl:w-5/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper relative">
                      <div className="timeline absolute inset-0 z-10 bg-black/40" />
                      <div className="gradient-line w-1 h-full absolute inset-0 z-0" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                      </div>
                      <TimelineCard
                        title={card.title}
                        date={card.date}
                        items={card.responsibilities}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectQuickview;
