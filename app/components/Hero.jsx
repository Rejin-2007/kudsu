"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, Users } from "lucide-react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between overflow-x-hidden selection:bg-white/20">
      {/* Background Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* 1. Header Navigation */}
      
      {/* 2. Main Hero Section (Responsive Grid) */}
      {/* 2. Main Hero Section (Responsive Grid) */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Union Members Image Showcase (First on mobile, second on desktop) */}
          <motion.div
            variants={fadeInUp}
            className="order-1 lg:order-2 lg:col-span-6 relative w-full"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 opacity-50 blur-xl pointer-events-none" />

            {/* Card Frame */}
            <div className="relative group rounded-2xl border border-neutral-800 bg-neutral-900/80 p-2 sm:p-3 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center">

                {/* Image rotated by 270 degrees */}
                <Image
                  src="/union.webp"
                  alt="University of Kerala Union Members 2025-26"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain rotate-[270deg] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  priority
                />
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-medium text-neutral-200 backdrop-blur-md bg-neutral-950/75 border border-white/10 p-2.5 rounded-lg flex justify-between items-center z-10">
                  <span>Union Executive Members</span>
                  <span className="text-xs text-neutral-400 font-mono">2025–26</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content Block (Second on mobile, first on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col text-left space-y-6">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400"
            >
              <Users className="w-4 h-4 text-neutral-300" />
              Official Executive Council
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent leading-[1.15] sm:leading-[1.15]"
            >
              DEPARTMENTS STUDENTS UNION 2025-26
              <span className="block text-xl sm:text-3xl font-medium text-neutral-400 mt-2">
                UNIVERSITY OF KERALA
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl"
            >
              The Kerala University Departments Students Union (DSU) is the official elected student governing body representing Post-Graduate and FYUGP students across the 44 teaching and research departments.
              <br /><br />
              DSU bridges academic knowledge and student activism through progressive, inclusive campus events including the <span className="text-neutral-200 font-normal">Campus Carnival</span>, <span className="text-neutral-200 font-normal">Kerala University Film Festival</span>, <span className="text-neutral-200 font-normal">Paattukoottam</span> acoustic sessions, political seminars, and essential student welfare initiatives.
            </motion.p>
          </div>
        </motion.div>
      </main>

      {/* 3. Leadership Contact Panel */}

    </div>
  );
}