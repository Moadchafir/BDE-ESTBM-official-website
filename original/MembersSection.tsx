"use client";

import { motion } from "framer-motion";
import { GenericModalForm } from "../GenericModalForm";
import { Instagram, Linkedin, Edit2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

const MOCK_MEMBERS = [
    { id: 1, name: "Alice Freeman", role: "Pr├®sidente", src: "https://i.pravatar.cc/150?u=a042581f4e29026024d", socials: { ig: "#", li: "#" } },
    { id: 2, name: "Bob Smith", role: "Secr├®taire G├®n├®ral", src: "https://i.pravatar.cc/150?u=a042581f4e29026704d", socials: { ig: "#", li: "#" } },
    { id: 3, name: "Charlie Davis", role: "Tr├®sorier", src: "https://i.pravatar.cc/150?u=a04258a2462d826712d", socials: { ig: "#", li: "#" } },
    { id: 4, name: "Diana Prince", role: "Resp. Com", src: "https://i.pravatar.cc/150?u=a04258114e29026702d", socials: { ig: "#", li: "#" } },
    { id: 5, name: "Ethan Hunt", role: "Resp. ├ëv├®nementiel", src: "https://i.pravatar.cc/150?u=a04258114e29026708d", socials: { ig: "#", li: "#" } },
    { id: 6, name: "Fiona Gallagher", role: "Relations Ext├®rieures", src: "https://i.pravatar.cc/150?u=a04258114e29026709d", socials: { ig: "#", li: "#" } },
];

export function MembersSection() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    return (
        <section id="members" className="w-full py-12 px-4 relative z-10">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">Nos Membres</h2>
                    <p className="text-slate-600 mt-4 text-lg">L&apos;├®quipe passionn├®e derri├¿re le bureau.</p>
                    {isAdmin && (
                        <div className="flex justify-center mt-6">
                            <GenericModalForm type="Member" onSubmit={(data) => console.log(data)} />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_MEMBERS.map((member, i) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="glass-card rounded-2xl p-6 group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-blue-200 relative"
                        >
                            {isAdmin && (
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/10 shadow-sm transition-all duration-300 group-hover:border-blue-500/40">
                                    <img src={member.src} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-lg text-black group-hover:text-blue-600 transition-colors duration-300 uppercase tracking-tight">{member.name}</h3>
                                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full mt-3 uppercase tracking-wider">
                                    {member.role}
                                </span>
                                <p className="text-xs text-slate-500 mt-4 line-clamp-2 leading-relaxed max-w-[200px]">
                                    D├®di├® au d├®veloppement de la vie ├®tudiante et ├á l'organisation d'├®v├®nements marquants.
                                </p>
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 w-full justify-center">
                                    <a href={member.socials.ig} className="text-slate-400 hover:text-[#E4405F] transition-colors duration-300">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href={member.socials.li} className="text-slate-400 hover:text-[#0A66C2] transition-colors duration-300">
                                        <Linkedin className="w-5 h-5" />
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
