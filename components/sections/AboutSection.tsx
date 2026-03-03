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
                            <p className="hidden md:block">
                                Au cœur de l&apos;ESTBM, le Bureau des Étudiants est le moteur de la vie campus. Nous transformons vos idées en réalité à travers des événements marquants, un accompagnement constant et une représentation authentique.
                            </p>
                            <p className="hidden md:block">
                                Notre mission est de créer un environnement où chaque étudiant peut s&apos;épanouir, s&apos;engager et innover. Ensemble, nous bâtissons une communauté forte et solidaire.
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
                                className="glass-card p-3 md:p-8 rounded-xl border border-slate-100/50 hover:border-blue-200/50 transition-colors group flex flex-col items-center md:items-start text-center md:text-left"
                            >
                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-1 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                                </div>
                                <div className="flex-1 flex flex-col items-center md:items-start justify-center">
                                    <div className="text-2xl md:text-4xl font-bold text-black mb-0.5 md:mb-1">
                                        <span className="gradient-subrosa">{stat.value}</span>
                                    </div>
                                    <div className="font-semibold text-slate-900 text-[8px] md:text-sm uppercase tracking-wider">{stat.label}</div>
                                </div>
                                <p className="hidden md:block text-slate-500 text-xs leading-relaxed mt-3">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
