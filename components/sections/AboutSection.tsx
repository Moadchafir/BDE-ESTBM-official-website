"use client";

import { motion } from "framer-motion";
import { Users, Calendar, GraduationCap, Zap } from "lucide-react";

const stats = [
    {
        label: "Membres Actifs",
        value: "9",
        description: "Une équipe dévouée au service des étudiants.",
        icon: Users,
    },
    {
        label: "Projets Annuels",
        value: "7+",
        description: "Événements, activités sociales et sorties d'intégration.",
        icon: Calendar,
    },
    {
        label: "Étudiants",
        value: "1500+",
        description: "Représentés et accompagnés au quotidien.",
        icon: GraduationCap,
    },
    {
        label: "Clubs Coordonnés",
        value: "14+",
        description: "Supervision et coordination de la vie associative.",
        icon: Zap,
    },
];

export function AboutSection() {
    return (
        <section id="about" className="w-full py-10 md:py-24 px-4 relative z-10 overflow-hidden scroll-mt-0">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Mission Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-6 md:mb-8 leading-tight text-center md:text-left">
                            Plus qu&apos;un bureau, <br />
                            <span className="gradient-subrosa">une vision partagée.</span>
                        </h2>
                        <div className="space-y-4 md:space-y-8 text-sm sm:text-lg text-slate-600 leading-relaxed font-light text-center md:text-left">
                            <p>
                                Au cœur de l&apos;ESTBM, le Bureau des Étudiants transforme vos idées en réalité à travers des événements marquants et un accompagnement constant.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="glass-card p-3 md:p-10 rounded-xl border border-slate-100/50 hover:border-blue-200/50 transition-colors group flex flex-col items-center justify-between text-center h-full"
                            >
                                <div className="w-8 h-8 md:w-14 md:h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-1 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-4 h-4 md:w-7 md:h-7 text-blue-500" />
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="text-2xl md:text-4xl font-bold text-black mb-0.5 md:mb-2 text-center">
                                        <span className="gradient-subrosa">{stat.value}</span>
                                    </div>
                                    <div className="font-semibold text-slate-900 text-[8px] md:text-base uppercase tracking-wider">{stat.label}</div>
                                </div>
                                <p className="hidden md:block text-slate-500 text-sm leading-relaxed mt-2">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
