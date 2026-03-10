import { useState, useEffect } from "react";
import { useScrollFade } from "../../components/ScrollFade";
import { StaggeredFade } from "../../components/StaggeredFade";
import { CollapsibleSection } from "../../components/CollapsibleSection";
import drawnPhoto from "../../assets/senior-picture-drawn.png";
import "./AboutMe.css";

export function AboutMe() {
  const [isMobile, setIsMobile] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollFade({ threshold: 0.35 });
  const { ref: focusRef, isVisible: focusVisible } = useScrollFade({
    threshold: 0.4,
  });

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const hobbies = [
    {
      icon: "☕",
      text: "Coffee",
      detail: "Espresso, latte art, bean exploration",
    },
    { icon: "🏃", text: "Running", detail: "Marathon PR: 3:12:49" },
    { icon: "🏋️", text: "Lifting", detail: "Bench Press 1RM: 275 lbs" },
    {
      icon: "⚽",
      text: "Playing Sports",
      detail: "Soccer, Pickleball, Golf, Frisbee, Hackysack",
    },
    { icon: "🏈", text: "Watching Sports", detail: "Go Pats!" },
    {
      icon: "🥾",
      text: "Exploring",
      detail: "Hiking, Walking, Visiting New Places",
    },
    { icon: "🎧", text: "Podcasts", detail: "Currently enjoying: Acquired" },
  ];

  return (
    <section className="about" id="about">
      <div className="about__container" ref={sectionRef}>
        {/* Top row: Photo placeholder (for morph) + Bio */}
        <div className="about__top-row">
          <div className="about__photo-placeholder">
            {/* Show drawn photo on mobile only */}
            {isMobile && (
              <img
                src={drawnPhoto}
                alt="Quinn Hilger - Hand drawn"
                className="about__mobile-photo"
              />
            )}
          </div>

          <div className="about__intro">
            <h2
              className={`about__heading ${isVisible ? "about__heading--visible" : ""}`}
            >
              About Me
            </h2>

            <div
              className={`about__bio ${isVisible ? "about__bio--visible" : ""}`}
            >
              <p>
                Hello! I'm a software engineer at{" "}
                <span className="about__highlight">DraftKings</span>, where I
                build tools for user segmentation and marketing personalization.
              </p>
              <p>
                I recently graduated{" "}
                <span className="about__highlight">Summa Cum Laude</span> from{" "}
                <span className="about__highlight">UCLA</span> with a degree in
                computer science, which sparked my interest in algorithms and
                AI.
              </p>
              <p>
                I've enjoyed creating user-facing{" "}
                <span className="about__highlight">iOS apps</span> around
                activities I care about, like habit tracking and fitness, and I
                really value the learning and impact I get from the work I do at
                DraftKings.
              </p>
              <p>
                Right now, I'm focused on{" "}
                <span className="about__highlight">growing as an engineer</span>{" "}
                and gaining the experience needed to tackle even more complex
                challenges. Looking ahead, I'm excited by the possibilities AI
                offers to solve important problems and make a meaningful impact
                in the world.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width sections below */}
        <div className="about__full-width">
          <div
            className={`about__focus ${focusVisible ? "about__focus--visible" : ""}`}
            ref={focusRef}
          >
            <h3 className="about__section-title">Current Focus</h3>
            <p>
              I'm evolving my development patterns to leverage the latest AI
              tools and explore new ways to solve problems. Currently, I'm
              interested in building{" "}
              <span className="about__highlight">AI-powered systems</span> that
              aggregate and analyze open-source data to provide actionable
              insights <em>(coming soon)</em>.
            </p>
          </div>

          <CollapsibleSection title="🎯 Hobbies & Interests">
            <p className="about__hobbies-intro">
              Outside of writing and thinking about software - I enjoy:
            </p>
            <StaggeredFade delay={80} isVisible={true}>
              {hobbies.map((hobby) => (
                <div key={hobby.text} className="about__hobby">
                  <span className="about__hobby-icon">{hobby.icon}</span>
                  <span className="about__hobby-text">
                    <strong>{hobby.text}</strong>
                    <span className="about__hobby-detail">
                      {" "}
                      — {hobby.detail}
                    </span>
                  </span>
                </div>
              ))}
            </StaggeredFade>
          </CollapsibleSection>
        </div>
      </div>
    </section>
  );
}
