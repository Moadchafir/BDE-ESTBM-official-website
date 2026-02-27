"use client";

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function HeroSection() {
    return (
        <section id="hero" className="w-full min-h-[90vh] flex items-center justify-center px-4 pt-24 pb-20 relative">
            <div className="container mx-auto text-center max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-black mb-8 leading-[0.95]">
                        Votre voix,{" "}
                        <br />
                        notre{" "}
                        <span className="gradient-subrosa">mission</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 mb-14 max-w-4xl mx-auto leading-relaxed"
                    >
                        L&apos;énergie étudiante au service de l&apos;excellence, de l&apos;engagement et de l&apos;innovation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    >
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="btn-subrosa px-12 py-4 text-sm">
                                    Nous Rejoindre
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-y-auto bg-white border border-slate-200 text-black">
                                <DialogHeader>
                                    <DialogTitle className="text-black">Rejoindre la Communauté</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="role" className="text-slate-700">Rôle Souhaité</Label>
                                        <select
                                            id="role"
                                            className="w-full h-10 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-black"
                                            required
                                        >
                                            <option value="">Sélectionnez un département</option>
                                            <option value="comm">Communication & Logistics</option>
                                            <option value="hr">HR</option>
                                            <option value="design">Design</option>
                                            <option value="social">SocialMedia ^ Content Creation</option>
                                            <option value="secretary">Secretary</option>
                                            <option value="finance">Finance & Sponsorship</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="motivation" className="text-slate-700">Description / Why join us?</Label>
                                        <Textarea
                                            id="motivation"
                                            placeholder="Tell us about yourself and your motivations"
                                            className="min-h-[80px] bg-slate-50 border-slate-200 text-black"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="capability" className="text-slate-700">Proof of Capability</Label>
                                        <Textarea
                                            id="capability"
                                            placeholder="A description for your role or anything that proves you're capable"
                                            className="min-h-[80px] bg-slate-50 border-slate-200 text-black"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="cv" className="text-slate-700">CV (Optionnel)</Label>
                                        <Input id="cv" type="file" className="bg-slate-50 border-slate-200 text-xs py-1.5 text-black" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="btn-subrosa text-xs px-6 py-2.5">
                                        Envoyer la demande
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>

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
