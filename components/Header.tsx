"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export function Header() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-transparent"
            }`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
                    <span className="text-lg font-semibold tracking-tight text-black">Bureau des Étudiants</span>
                </div>

                {/* Center Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <button onClick={() => scrollToSection("hero")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Accueil</button>
                    <button onClick={() => scrollToSection("members")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Membres</button>
                    <button onClick={() => scrollToSection("events")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Événements</button>
                    <button onClick={() => scrollToSection("contact")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Contact</button>
                </nav>

                {/* Right - Join Us */}
                <div className="flex items-center">
                    {mounted ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="btn-subrosa text-xs px-6 py-2.5">
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
                                            className="w-full h-10 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400"
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
                                            className="min-h-[80px] bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="capability" className="text-slate-700">Proof of Capability</Label>
                                        <Textarea
                                            id="capability"
                                            placeholder="A description for your role or anything that proves you're capable"
                                            className="min-h-[80px] bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="cv" className="text-slate-700">CV (Optionnel)</Label>
                                        <Input id="cv" type="file" className="bg-slate-50 border-slate-200 text-xs py-1.5" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="btn-subrosa text-xs px-6 py-2.5">
                                        Envoyer la demande
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <button className="btn-subrosa text-xs px-6 py-2.5">
                            Nous Rejoindre
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
