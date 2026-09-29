import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { webExpCards, aiExpCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import TimelineCard from "../components/TimelineCard";
import { scrollToProject } from "../lib/scrollToProject";

gsap.registerPlugin(ScrollTrigger);

const ProjectQuickview = () => {
  const [activeCategory, setActiveCategory] = useState("Web Dev");
  const containerRef = useRef(null);

  const activeCards = activeCategory === "Web Dev" ? webExpCards : aiExpCards;

  useGSAP(() => {
    const triggerElements = gsap.utils.toArray(".exp-card-wrapper", containerRef.current);

    // Fade up animation on scroll and tab switch
    triggerElements.forEach((card, index) => {
        gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.1 * index, // Slight stagger effect on tab switch
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=50",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Animate the timeline height as the user scrolls.
    // toArray returns [] when nothing matches, and gsap.to([]) logs
    // "GSAP target  not found" — the blank name is the empty array stringifying
    // to "". Guarding is correct anyway: there is nothing to animate.
    const timelines = gsap.utils.toArray(".timeline", containerRef.current);
    if (timelines.length) {
      gsap.to(timelines, {
        transformOrigin: "bottom bottom",
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-list-container",
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => {
            // Re-resolve rather than reuse the captured list: the section
            // re-renders on tab switch, so the old nodes may be detached.
            const current = gsap.utils.toArray(".timeline", containerRef.current);
            if (current.length) gsap.to(current, { scaleY: 1 - self.progress });
          },
        },
      });
    }

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [activeCategory] });

  return (
    <section
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5" id="project-quickview" ref={containerRef}>
        <TitleHeader
          title="Project Quickview"
          sub="Projects at a Glance"
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
                    {/* The whole card is the link into that project's detailed
                        view. An <a> rather than a click handler on a <div> so
                        it stays keyboard-reachable and is announced properly. */}
                    <a
                      href={card.detailHref}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToProject(card.detailHref);
                      }}
                      aria-label={`${card.title} — jump to the full project`}
                      className="expText project-link flex xl:gap-20 md:gap-10 gap-5 relative z-20"
                    >
                      <div className={`timeline-logo ${card.logoOnLight ? 'timeline-logo-light' : ''}`}>
                        <img src={card.logoPath} alt="" loading="lazy" />
                      </div>
                      <TimelineCard
                        title={card.title}
                        kind={card.kind}
                        summary={card.summary}
                        stack={card.stack}
                        highlight={card.highlight}
                        metric={card.metric}
                        cta="View the full project"
                      />
                    </a>
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
