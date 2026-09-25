import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { INTRO_FINISHED_EVENT } from "@/sections/HeroSection/components/HeroVideo";

type RevealProps = {
  children: ReactNode;
  className?: string;
  // Element to render, e.g. "li" inside lists.
  as?: ElementType;
  // Seconds to wait before the animation starts (use it to stagger items).
  delay?: number;
  duration?: number;
  variant?: "up" | "fade" | "scale" | "left";
  // "scroll": animate when scrolled into view (default).
  // "intro": animate once the intro video has finished (for the hero).
  trigger?: "scroll" | "intro";
};

const hidden = {
  up: "opacity-0 translate-y-5",
  fade: "opacity-0",
  scale: "opacity-0 scale-95",
  left: "opacity-0 -translate-x-5",
} as const;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fade/slide-in animation, played once (like framer-motion's whileInView + viewport once).
export const Reveal = ({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  duration = 0.6,
  variant = "up",
  trigger = "scroll",
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(prefersReducedMotion());

  useEffect(() => {
    if (shown) return;

    if (trigger === "intro") {
      const show = () => setShown(true);
      window.addEventListener(INTRO_FINISHED_EVENT, show);
      return () => window.removeEventListener(INTRO_FINISHED_EVENT, show);
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, trigger]);

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] ease-out ${shown ? (variant === "fade" ? "opacity-100" : "opacity-100 translate-x-0 translate-y-0 scale-100") : hidden[variant]} ${className}`}
      style={{ transitionDuration: `${duration}s`, transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
};
