"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GenericModalForm } from "../GenericModalForm";
import { Calendar, MapPin, X, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const MOCK_EVENTS = [
    {
        id: 1,
        title: "Gala de Bienvenue",
        date: "15 Sep 2025",
        location: "Grand Amphi",
        type: "Soirée",
        image: "https://images.unsplash.com/photo-1511578314322-379afb47 structure6c?auto=format&fit=crop&q=80&w=800",
        description: "Une soirée mémorable pour accueillir les nouveaux étudiants. Buffet, musique et rencontres au programme de cette édition exceptionnelle qui a rassemblé plus de 500 personnes."
    },
    {
        id: 2,
        title: "Tournoi E-Sport",
        date: "22 Oct 2025",
        location: "Salle Multimédia",
        type: "Gaming",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
        description: "Compétition intense sur les titres les plus populaires du moment. Une journée dédiée à la passion du jeu vidéo avec des lots exceptionnels pour les vainqueurs."
    },
    {
        id: 3,
        title: "Forum Carrières",
        date: "10 Nov 2025",
        location: "Hall Principal",
        type: "Professionnel",
        image: "https://images.unsplash.com/photo-1540575861501-7ad0606b7ad3?auto=format&fit=crop&q=80&w=800",
        description: "Rencontre entre étudiants et entreprises leaders du secteur. Ateliers CV, simulations d'entretiens et networking pour lancer sa carrière professionnelle."
    },
];

export function EventsSection() {
    const [selectedEvent, setSelectedEvent] = useState<typeof MOCK_EVENTS[0] | null>(null);
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    return (
        <section id="events" className="w-full py-24 px-4 relative z-10">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">Nos Événements Passés</h2>
                    <p className="text-slate-600 mt-4 text-lg">Revivez les moments forts de notre vie associative.</p>
                    {isAdmin && (
                        <div className="flex justify-center mt-6">
                            <GenericModalForm type="Event" onSubmit={(data) => console.log(data)} />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_EVENTS.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-blue-200"
                        >
                            <div className="h-48 w-full overflow-hidden relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm">
                                        {event.type}
                                    </span>
                                </div>
                                {isAdmin && (
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); /* edit logic */ }}
                                            className="p-1.5 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg hover:bg-white transition-colors shadow-sm"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); /* delete logic */ }}
                                            className="p-1.5 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg hover:bg-white transition-colors shadow-sm"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl text-black group-hover:text-blue-600 transition-colors duration-300 mb-4">
                                    {event.title}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-slate-400 gap-2">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-400 gap-2">
                                        <MapPin className="w-4 h-4 text-blue-400" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 mt-4 line-clamp-2">
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative border border-slate-100"
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="h-64 w-full">
                                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">
                                            {selectedEvent.type}
                                        </span>
                                        <h3 className="text-3xl font-bold text-black leading-tight">{selectedEvent.title}</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <Calendar className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Date</p>
                                            <p className="font-semibold text-black">{selectedEvent.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <MapPin className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Lieu</p>
                                            <p className="font-semibold text-black">{selectedEvent.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <button onClick={() => setSelectedEvent(null)} className="btn-subrosa w-full py-4 text-sm rounded-full">
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
