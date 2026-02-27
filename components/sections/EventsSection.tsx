"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GenericModalForm } from "../GenericModalForm";
import { Calendar, MapPin, X, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export function EventsSection() {
    const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const eventsScrollRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";
    const [events, setEvents] = useState<any[]>([]);

    const fetchEvents = async () => {
        const res = await fetch("/api/events");
        if (res.ok) {
            const data = await res.json();

            const monthMap: { [key: string]: number } = {
                'Jan': 0, 'Janv': 0, 'Fev': 1, 'Feb': 1, 'Mar': 2, 'Avr': 3, 'Apr': 3,
                'Mai': 4, 'May': 4, 'Juin': 5, 'Jun': 5, 'Juil': 6, 'Jul': 6,
                'Aout': 7, 'Aug': 7, 'Sept': 8, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
            };

            const sortedData = [...data].sort((a, b) => {
                const parseDate = (dStr: string) => {
                    const [m, y] = dStr.split(' ');
                    const month = monthMap[m] ?? 0;
                    const year = parseInt(y);
                    return new Date(year, month).getTime();
                };
                return parseDate(b.date) - parseDate(a.date);
            });
            setEvents(sortedData);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const isOpen = selectedEventIndex !== null || showAll;
        if (isOpen) {
            document.body.classList.add("hide-header");
            document.body.style.overflow = "hidden";
        } else {
            document.body.classList.remove("hide-header");
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.classList.remove("hide-header");
            document.body.style.overflow = "unset";
        };
    }, [selectedEventIndex, showAll]);

    const handleNextImage = (images: string[]) => {
        setCurrentImageIdx((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = (images: string[]) => {
        setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNextEvent = () => {
        if (selectedEventIndex !== null) {
            const nextIdx = (selectedEventIndex + 1) % events.length;
            setSelectedEventIndex(nextIdx);
            setCurrentImageIdx(0);
        }
    };

    const handlePrevEvent = () => {
        if (selectedEventIndex !== null) {
            const prevIdx = (selectedEventIndex - 1 + events.length) % events.length;
            setSelectedEventIndex(prevIdx);
            setCurrentImageIdx(0);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
        const res = await fetch("/api/events", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            fetchEvents();
        }
    };

    const selectedEvent = selectedEventIndex !== null ? events[selectedEventIndex] : null;

    return (
        <section id="events" className="w-full py-12 px-4 relative z-10 overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">Nos Événements Passés</h2>
                    <p className="text-slate-600 mt-4 text-lg">Revivez les moments forts de notre vie associative.</p>
                    <div className="flex justify-center gap-4 mt-6">
                        {isAdmin && <GenericModalForm type="Event" onSuccess={fetchEvents} />}
                        <Button
                            variant="outline"
                            className="rounded-full border-slate-200 hover:bg-slate-50"
                            onClick={() => setShowAll(true)}
                        >
                            Voir Tout
                        </Button>
                    </div>
                </div>

                <div className="relative group/events">
                    {events.length > 3 && (
                        <>
                            <button
                                onClick={() => {
                                    if (eventsScrollRef.current) {
                                        const cardWidth = (eventsScrollRef.current.children[0] as HTMLElement)?.offsetWidth + 24;
                                        eventsScrollRef.current.scrollLeft -= cardWidth;
                                    }
                                }}
                                className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white shadow-xl rounded-full text-slate-900 hover:bg-slate-50 transition-all border border-slate-100 opacity-0 group-hover/events:opacity-100"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => {
                                    if (eventsScrollRef.current) {
                                        const cardWidth = (eventsScrollRef.current.children[0] as HTMLElement)?.offsetWidth + 24;
                                        eventsScrollRef.current.scrollLeft += cardWidth;
                                    }
                                }}
                                className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white shadow-xl rounded-full text-slate-900 hover:bg-slate-50 transition-all border border-slate-100 opacity-0 group-hover/events:opacity-100"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    <div
                        ref={eventsScrollRef}
                        className={`
                        ${events.length >= 3
                                ? "flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-4 px-4 mask-fade-edges scroll-smooth"
                                : "grid grid-cols-1 md:grid-cols-3 gap-6"
                            }
                    `}>
                        {events.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                onClick={() => {
                                    setSelectedEventIndex(i);
                                    setCurrentImageIdx(0);
                                }}
                                className={`
                                glass-card rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-blue-200 relative
                                ${events.length >= 3 ? "min-w-[300px] md:min-w-[calc(33.333%-24px)] snap-center" : "w-full"}
                            `}
                            >
                                <div className="h-48 w-full overflow-hidden relative">
                                    <img src={(event.image || "").split(',')[0].trim()} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm">
                                            {event.type}
                                        </span>
                                    </div>
                                    {isAdmin && (
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <GenericModalForm type="Event" initialData={event} onSuccess={fetchEvents} />
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(event.id); }}
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
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-3xl overflow-hidden max-w-6xl w-full shadow-2xl relative border border-slate-100 max-h-[95vh] flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedEventIndex(null)}
                                    className="absolute top-4 right-4 z-40 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-colors shadow-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="overflow-y-auto w-full h-full custom-scrollbar">
                                    <div className="relative group/gallery">
                                        <div className="h-[300px] md:h-[400px] w-full bg-slate-50 flex items-center justify-center overflow-hidden">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentImageIdx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    src={(selectedEvent.image || "").split(",")[currentImageIdx]?.trim()}
                                                    alt={`${selectedEvent.title} - ${currentImageIdx + 1}`}
                                                    className="max-w-full max-h-full object-contain p-2"
                                                />
                                            </AnimatePresence>
                                        </div>

                                        {(selectedEvent.image || "").split(",").length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => handlePrevImage((selectedEvent.image || "").split(","))}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-all shadow-lg z-20"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => handleNextImage((selectedEvent.image || "").split(","))}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-all shadow-lg z-20"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="p-10 md:p-12">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                                                    {selectedEvent.type}
                                                </span>
                                                <h3 className="text-4xl font-bold text-black leading-tight">{selectedEvent.title}</h3>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                            <div className="flex items-center gap-4 text-slate-600">
                                                <div className="p-3 bg-blue-50 rounded-xl">
                                                    <Calendar className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Date de l&apos;événement</p>
                                                    <p className="font-bold text-black text-lg">{selectedEvent.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-600">
                                                <div className="p-3 bg-blue-50 rounded-xl">
                                                    <MapPin className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Lieu</p>
                                                    <p className="font-bold text-black text-lg">{selectedEvent.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap border-l-4 border-blue-500/20 pl-6 italic">
                                                {selectedEvent.description}
                                            </p>
                                        </div>
                                        <div className="mt-12 flex justify-end items-center border-t border-slate-100 pt-8">
                                            <button onClick={() => setSelectedEventIndex(null)} className="btn-subrosa px-10 py-4 text-sm rounded-full">
                                                Fermer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                {/* Show All Modal */}
                <AnimatePresence>
                    {showAll && (
                        <div className="fixed inset-0 z-[10000] bg-white flex flex-col">
                            <div className="container mx-auto flex h-20 items-center justify-between px-4 border-b border-slate-100 mb-8">
                                <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Tous nos Événements ({events.length})</h2>
                                <button
                                    onClick={() => setShowAll(false)}
                                    className="p-2 bg-slate-100 rounded-full text-slate-900 hover:bg-slate-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 pb-20 custom-scrollbar">
                                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {events.map((event, i) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                            onClick={() => {
                                                setShowAll(false);
                                                setSelectedEventIndex(i);
                                                setCurrentImageIdx(0);
                                            }}
                                            className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-blue-200 transition-all shadow-airy"
                                        >
                                            <div className="h-48 w-full overflow-hidden relative">
                                                <img src={(event.image || "").split(',')[0].trim()} alt={event.title} className="w-full h-full object-cover" />
                                                <span className="absolute top-4 left-4 text-[10px] font-bold text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm uppercase tracking-widest">
                                                    {event.type}
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-lg text-black mb-3">{event.title}</h3>
                                                <div className="flex items-center text-xs text-slate-400 gap-2 mb-2">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 line-clamp-2">{event.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
