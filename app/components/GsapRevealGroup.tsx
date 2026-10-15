"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GsapRevealGroupProps = {
  children: ReactNode;
  className: string;
  id?: string;
};

export function GsapSectionIntro({
  children,
  className,
  id,
}: GsapRevealGroupProps) {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = introRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      const targets = root.querySelectorAll<HTMLElement>("[data-gsap-intro]");

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          gsap.from(targets, {
            y: 8,
            opacity: 0.96,
            duration: 0.42,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
          });
        },
      );
      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => {
          gsap.from(targets, {
            y: 5,
            opacity: 0.96,
            duration: 0.36,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "all",
          });
        },
      );

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div id={id} ref={introRef} className={className}>
      {children}
    </div>
  );
}

export default function GsapRevealGroup({
  children,
  className,
}: GsapRevealGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = groupRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      const cards = root.querySelectorAll<HTMLElement>("[data-gsap-reveal-item]");

      const addBatch = (distance: number) => {
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (visibleCards) => {
            gsap.fromTo(
              visibleCards,
              { y: distance, opacity: 0.92 },
              {
                y: 0,
                opacity: 1,
                duration: 0.42,
                stagger: 0.06,
                ease: "power2.out",
                overwrite: true,
              },
            );
          },
        });
      };

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => addBatch(16),
      );
      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => addBatch(10),
      );

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={groupRef} className={className}>
      {children}
    </div>
  );
}
