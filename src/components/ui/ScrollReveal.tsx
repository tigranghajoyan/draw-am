import { useEffect, useRef, useState } from "react";

const callbacks = new Map<Element, () => void>();

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb();
              callbacks.delete(entry.target);
              sharedObserver!.unobserve(entry.target);
            }
          }
        }
      },
      { threshold: 0.1 },
    );
  }
  return sharedObserver;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const element = ref.current;
    if (!element) return;

    const observer = getObserver();
    callbacks.set(element, () => setIsVisible(true));
    observer.observe(element);

    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: prefersReducedMotion ? undefined : `${delay}ms` }}
    >
      {children}
    </div>
  );
}
