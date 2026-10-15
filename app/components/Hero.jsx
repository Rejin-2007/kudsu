"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll("[data-hero-copy]"), {
          y: 12,
          opacity: 0.94,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "all",
        });

        gsap.from(root.querySelector("[data-hero-visual]"), {
          y: 8,
          scale: 0.985,
          opacity: 0.96,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "all",
        });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-neutral-950 text-neutral-100 selection:bg-white/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            data-hero-visual
            className="relative order-1 w-full lg:order-2 lg:col-span-6"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 opacity-50 blur-xl" />

            <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 p-2 shadow-2xl backdrop-blur-sm sm:p-3">
              <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-950 sm:aspect-[4/3]">
                <Image
                  src="/union.webp"
                  alt="University of Kerala Union Members 2025-26"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  className="rotate-[270deg] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  preload
                />
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between rounded-lg border border-white/10 bg-neutral-950/75 p-2.5 text-xs font-medium text-neutral-200 backdrop-blur-md sm:text-sm">
                  <span>Union Executive Members</span>
                  <span className="font-mono text-xs text-neutral-400">2025–26</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col space-y-6 text-left lg:order-1 lg:col-span-6">
            <div>
              <h1
                data-hero-copy
                className="bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-3xl font-extrabold leading-[1.15] tracking-tight text-transparent sm:text-5xl lg:text-6xl"
              >
                DEPARTMENTS STUDENTS UNION 2025-26
                <span className="mt-2 block text-xl font-medium text-neutral-400 sm:text-3xl">
                  UNIVERSITY OF KERALA
                </span>
              </h1>

              <div
                data-hero-copy
                className="mt-5 space-y-3 sm:space-y-2"
              >
                <a
                  href="mailto:keralauniversity.dsu@gmail.com"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white sm:text-base"
                  aria-label="Email Kerala University DSU"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>keralauniversity.dsu@gmail.com</span>
                </a>
                <a
                  href="https://www.instagram.com/kerala_university_dsu?igsh=aXR2b2tqcG44NnN5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white sm:text-base"
                  aria-label="Follow Kerala University DSU on Instagram"
                >
                  <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>kerala_university_dsu</span>
                </a>
              </div>
            </div>

            <p
              data-hero-copy
              className="max-w-2xl text-sm font-light leading-relaxed text-neutral-400 sm:text-base"
            >
              The Kerala University Departments Students Union (DSU) is the official elected student governing body representing the Post-Graduate and FYUGP students across the 44 teaching and research departments of the University of Kerala. The union aims to bridge the gap between academic knowledge and student activism by creating a progressive, inclusive, and democratically active campus atmosphere. DSU conducts several highlight events such as
              <b className="text-white">
                {" "}Campus Carnival, Kerala University Film Festival, Campus Sports, Quiz Fest, Arts Fest, Campus Fest{" "}
              </b>
              etc. The union also hosts massive, festive community celebrations for Onam, Christmas etc, alongside ive stadium-style screenings of global sports matches.
              <br />
              <br />
              On a routine basis, the DSU enlivens campus spaces through informal acoustic circles known as Paattukoottam, regular indie and mainstream movie screenings by the DSU Film Club, and political seminars that drive active student engagement. The union also consistently push for student welfare initiatives, including organizing university help desks, career orientations, transgender-friendly inclusive programs etc.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
