"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

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
      staggerChildren: 0.2,
    },
  },
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between overflow-x-hidden selection:bg-white/20">
      {/* Background Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      {/* 1. Centered Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-16 w-48 sm:w-56"
        >
          {/* Logo with inverted filter to render white in dark theme */}
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            sizes="(max-width: 768px) 100vw, 18rem"
            className="object-contain invert brightness-0"
            priority
          />
        </motion.div>
      </header>

      {/* 2. Main Hero Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center items-center text-center my-8 md:my-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent max-w-4xl leading-[1.2] md:leading-[1.15]"
          >
            Kerala University Kariyavattom Campus Students Union
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed px-2"
          >
            The University Students’ Union is the democratic voice of our campus, bridging the gap between students and administration. We champion student welfare, drive vibrant campus life through clubs and festivals, and provide the essential resources for everyone to thrive.
          </motion.p>
        </motion.div>
      </main>

      {/* 3. Leadership Contact Panel (Mobile Friendly Grid) */}
      <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950/80 backdrop-blur-md w-full">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-900">

          {/* Chairman Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-4 pb-6 md:pb-0"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mt-1">Chairman</h3>
            </div>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2 rounded-lg bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-900 group-hover:border-neutral-800 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">+91 98765 43210</span>
              </a>
              <a
                href="mailto:chairman@example.com"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2 rounded-lg bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-900 group-hover:border-neutral-800 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all">chairman@example.com</span>
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
              <h3 className="text-lg sm:text-xl font-semibold text-white mt-1">General Secretary</h3>
            </div>
            <div className="space-y-3">
              <a
                href="tel:+919876543211"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2 rounded-lg bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-900 group-hover:border-neutral-800 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">+91 98765 43211</span>
              </a>
              <a
                href="mailto:secretary@example.com"
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm w-fit"
              >
                <div className="p-2 rounded-lg bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-900 group-hover:border-neutral-800 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all">secretary@example.com</span>
              </a>
            </div>
          </motion.div>

        </div>
      </footer>
    </div>
  );
}