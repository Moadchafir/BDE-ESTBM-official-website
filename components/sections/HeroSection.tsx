"use client";

import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section id="hero" className="w-full min-h-[90vh] flex items-center justify-center px-4 pt-24 pb-20 relative">
            <div className="container mx-auto text-center max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Badge */}


                    {/* Headline */}
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-black mb-8 leading-[0.95]">
                        Votre voix,{" "}
                        <br />
                        notre{" "}
                        <span className="gradient-subrosa">mission</span>
                    </h1>

                    {/* Sub-text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 mb-14 max-w-4xl mx-auto leading-relaxed"
                    >
                        Une communauté dynamique au service de l&apos;excellence et de l&apos;innovation étudiante.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    >
                        <button
                            className="btn-subrosa px-12 py-4 text-sm"
                            onClick={() => {
                                const contact = document.getElementById("contact");
                                contact?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Rejoignez-nous
                        </button>
                        <button
                            className="btn-subrosa-outline px-12 py-4 text-sm"
                            onClick={() => {
                                const contact = document.getElementById("contact");
                                contact?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Collaborer avec nous
                        </button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-[-60px] left-1/2 -translate-x-1/2"
                >
                    <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent mx-auto" />
                </motion.div>
            </div>
        </section>
    );
}
