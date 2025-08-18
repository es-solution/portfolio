import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=30%",
  stagger = 0.05
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block scroll-float-char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll(".scroll-float-char");

    if (charElements.length === 0) return;

    // Set initial state
    gsap.set(charElements, {
      willChange: "opacity, transform",
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%"
    });

    // Create timeline with stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: scrollStart,
        end: scrollEnd,
        scrub: 0.5, // Slower scrub for more visible stagger
        onUpdate: (self) => {
          // Debug log to see if ScrollTrigger is working
          console.log("ScrollTrigger progress:", self.progress);
        }
      }
    });

    // Add staggered animation to timeline
    tl.to(charElements, {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: {
        amount: Math.max(stagger * charElements.length, 1), // Ensure minimum 1 second total stagger
        from: "start",
        ease: "power2.out"
      }
    });

    return () => {
      tl.kill();
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    children
  ]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 overflow-hidden ${containerClassName}`}
    >
      <span
        className={`inline-block ${textClassName}`}
        style={{
          fontSize: containerClassName.includes('large') ? 'clamp(2.5rem, 6vw, 4rem)' : 'clamp(1.6rem, 4vw, 3rem)',
          lineHeight: containerClassName.includes('large') ? '1.2' : '1.5'
        }}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;