import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
    text,
    className = "",
    delay = 100,
    duration = 0.6,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}) => {
    const ref = useRef(null);
    const animationCompletedRef = useRef(false);
    const scrollTriggerRef = useRef(null);
    const splitterRef = useRef(null);
    const timelineRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current || !text || hasAnimated) return;

        const el = ref.current;
        animationCompletedRef.current = false;

        // Prevent multiple initializations
        if (splitterRef.current || timelineRef.current) return;

        const absoluteLines = splitType === "lines";
        if (absoluteLines) el.style.position = "relative";

        let splitter;
        try {
            splitter = new GSAPSplitText(el, {
                type: splitType,
                absolute: absoluteLines,
                linesClass: "split-line",
            });
            splitterRef.current = splitter;
        } catch (error) {
            console.error("Failed to create SplitText:", error);
            return;
        }

        let targets;
        switch (splitType) {
            case "lines":
                targets = splitter.lines;
                break;
            case "words":
                targets = splitter.words;
                break;
            case "chars":
                targets = splitter.chars;
                break;
            default:
                targets = splitter.chars;
        }

        if (!targets || targets.length === 0) {
            console.warn("No targets found for SplitText animation");
            splitter.revert();
            splitterRef.current = null;
            return;
        }

        // Set initial styles without willChange to prevent glitching
        targets.forEach((t) => {
            gsap.set(t, { ...from, force3D: true });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
                refreshPriority: -1,
                onToggle: (self) => {
                    scrollTriggerRef.current = self;
                },
            },
            smoothChildTiming: true,
            onComplete: () => {
                animationCompletedRef.current = true;
                setHasAnimated(true);
                // Clean up willChange after animation
                targets.forEach((t) => {
                    t.style.willChange = "auto";
                });
                onLetterAnimationComplete?.();
            },
        });

        timelineRef.current = tl;

        // Add willChange only during animation
        tl.call(() => {
            targets.forEach((t) => {
                t.style.willChange = "transform, opacity";
            });
        });

        tl.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            if (targets) {
                gsap.killTweensOf(targets);
            }
            if (splitterRef.current) {
                splitterRef.current.revert();
                splitterRef.current = null;
            }
        };
    }, [text]); // Only depend on text to prevent re-runs

    return (
        <span
            ref={ref}
            className={`split-parent overflow-hidden inline whitespace-normal ${className}`}
            style={{
                textAlign,
                wordWrap: "break-word",
                pointerEvents: hasAnimated ? "auto" : "none", // Prevent interaction during animation
                display: 'inline'
            }}
        >
            {text}
        </span>
    );
};

export default SplitText;