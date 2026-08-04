"use client"
import React from 'react'
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
const POC = () => {
    return (
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
    )
}

export default POC