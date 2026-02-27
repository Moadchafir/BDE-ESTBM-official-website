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
        <section id="about" className="w-full py-0 px-4 relative z-10 overflow-hidden scroll-mt-0">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Mission Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-8 leading-tight">
                            Plus qu&apos;un bureau, <br />
                            <span className="gradient-subrosa">une vision partagée.</span>
                        </h2>
                        <div className="space-y-8 text-xl text-slate-600 leading-relaxed font-light">
                            <p>
                                Au cœur de l&apos;ESTBM, le Bureau des Étudiants est le moteur de la vie campus. Nous transformons vos idées en réalité à travers des événements marquants, un accompagnement constant et une représentation authentique.
                            </p>
                            <p>
                                Notre mission est de créer un environnement où chaque étudiant peut s&apos;épanouir, s&apos;engager et innover. Ensemble, nous bâtissons une communauté forte et solidaire.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="glass-card p-8 rounded-2xl border border-slate-100/50 hover:border-blue-200/50 transition-colors group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-7 h-7 text-blue-500" />
                                </div>
                                <div className="text-4xl font-bold text-black mb-2">
                                    <span className="gradient-subrosa">{stat.value}</span>
                                </div>
                                <div className="font-semibold text-slate-900 text-base mb-1 uppercase tracking-wider">{stat.label}</div>
                                <p className="text-slate-500 text-sm leading-relaxed">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
