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
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-14 w-40 sm:h-16 sm:w-56"
        >
          {/* Logo with inverted filter to render white in dark theme */}
          <Image
            src="/logo.png"
            alt="University of Kerala Logo"
            fill
            sizes="(max-width: 768px) 160px, 224px"
            className="object-contain invert brightness-0"
            priority
          />
        </motion.div>

        {/* Small Tagline/Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-xs font-medium text-neutral-400"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          DSU 2025–26
        </motion.div>
      </header>

      {/* 2. Main Hero Section (Responsive Grid) */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Text Content Block */}
          <div className="lg:col-span-6 flex flex-col text-left space-y-6">
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

          {/* Union Members Image Showcase */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-6 relative w-full mt-4 lg:mt-0"
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
        </motion.div>
      </main>

      {/* 3. Leadership Contact Panel */}
      <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950/90 backdrop-blur-md w-full">
        <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-900">

          {/* Chairman Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-4 pb-6 md:pb-0"
          >
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Leadership</span>
              <h3 className="text-lg sm:text-xl font-semibold text-white mt-0.5">Chairman</h3>
            </div>
            <div className="space-y-3">
              <a
                href="tel:+919207831937"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2.5 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-800/80 group-hover:border-neutral-700 transition-colors">
                  <Phone className="w-4 h-4 text-neutral-300" />
                </div>
                <span className="font-medium">+91 92078 31937</span>
              </a>
              <a
                href="mailto:ebysanalvs@gmail.com"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2.5 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-800/80 group-hover:border-neutral-700 transition-colors">
                  <Mail className="w-4 h-4 text-neutral-300" />
                </div>
                <span className="break-all">ebysanalvs@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* General Secretary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-4 pt-6 md:pt-0 md:pl-12"
          >
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Leadership</span>
              <h3 className="text-lg sm:text-xl font-semibold text-white mt-0.5">General Secretary</h3>
            </div>
            <div className="space-y-3">
              <a
                href="tel:+917736791471"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2.5 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-800/80 group-hover:border-neutral-700 transition-colors">
                  <Phone className="w-4 h-4 text-neutral-300" />
                </div>
                <span className="font-medium">+91 77367 91471</span>
              </a>
              <a
                href="mailto:meenakshisujeev@gmail.com"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2.5 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-800/80 group-hover:border-neutral-700 transition-colors">
                  <Mail className="w-4 h-4 text-neutral-300" />
                </div>
                <span className="break-all">meenakshisujeev@gmail.com</span>
              </a>
            </div>
          </motion.div>

        </div>
      </footer>
    </div>
  );
}