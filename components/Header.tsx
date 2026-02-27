"use client";

import Image from "next/image";
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

    if (!mounted) return null;

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-transparent"
            }`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
                    <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
                    <span className="text-lg font-semibold tracking-tight text-black">Bureau des Étudiants</span>
                </div>

                {/* Center Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <button onClick={() => scrollToSection("hero")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Accueil</button>
                    <button onClick={() => scrollToSection("about")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">À Propos</button>
                    <button onClick={() => scrollToSection("members")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Membres</button>
                    <button onClick={() => scrollToSection("events")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Événements</button>
                    <button onClick={() => scrollToSection("contact")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Contact</button>
                </nav>

                {/* Right - Admin Actions / Join Us (Buttons moved to Hero) */}
                <div className="flex items-center gap-4 md:min-w-[150px] justify-end whitespace-nowrap">
                    {/* Admin actions are now integrated into the Hero Section buttons */}
                </div>
            </div>
        </header>
    );
}
