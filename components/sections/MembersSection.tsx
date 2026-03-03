"use client";

import { motion } from "framer-motion";
import { GenericModalForm } from "../GenericModalForm";
import { Instagram, Linkedin, Edit2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";

export function MembersSection() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";
    const [members, setMembers] = useState<any[]>([]);

    const fetchMembers = async () => {
        const res = await fetch("/api/members");
        if (res.ok) {
            const data = await res.json();
            const sortedData = [...data].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
            setMembers(sortedData);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer ce membre ?")) return;
        const res = await fetch(`/api/members?id=${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            fetchMembers();
        }
    };

    return (
        <section id="members" className="w-full py-10 md:py-24 px-4 relative">
            <div className="container mx-auto">
                <div className="text-center mb-6 md:mb-16">
                    <h2 className="text-lg sm:text-4xl md:text-5xl font-bold tracking-tight text-black uppercase">Nos Membres</h2>
                    <p className="text-slate-500 text-[10px] md:text-lg max-w-2xl mx-auto uppercase tracking-widest font-bold">L&apos;équipe passionnée derrière le bureau.</p>
                    {isAdmin && (
                        <div className="flex justify-center mt-6">
                            <GenericModalForm type="Member" onSuccess={fetchMembers} />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {members.map((member, i) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="glass-card rounded-xl p-3 md:p-8 group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-blue-200 relative flex flex-col"
                        >
                            {isAdmin && (
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <GenericModalForm type="Member" initialData={member} onSuccess={fetchMembers} />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(member.id); }}
                                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                            <div className="flex flex-col items-center text-center flex-1">
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 border-2 border-white/10 shadow-sm transition-all duration-300 group-hover:border-blue-500/40">
                                    <img src={member.src} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-[8px] md:text-lg text-black group-hover:text-blue-600 transition-colors duration-300 uppercase tracking-tight w-full px-0.5 leading-[1.1]">{member.name}</h3>
                                <div className="w-full flex items-center justify-center py-0.5">
                                    <span className="inline-block text-[6px] md:text-xs font-bold text-blue-400 bg-blue-500/10 px-1.5 md:px-4 py-0 md:py-1.5 rounded-full uppercase tracking-wider break-words max-w-full">
                                        {member.role}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-slate-100 w-full mt-auto">
                                <div className="h-7 md:h-12 flex items-center justify-center gap-3 md:gap-4">
                                    <a href={member.socials?.ig || member.ig || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E4405F] transition-colors duration-300">
                                        <Instagram className="w-3 h-3 md:w-5 md:h-5" />
                                    </a>
                                    <a href={member.socials?.li || member.li || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0A66C2] transition-colors duration-300">
                                        <Linkedin className="w-3 h-3 md:w-5 md:h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
