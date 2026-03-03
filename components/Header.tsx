"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        setIsMenuOpen(false);
    };

    if (!mounted) return null;

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-transparent"
            }`}>
            <div className="container mx-auto flex h-[52px] md:h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer z-[60]" onClick={() => scrollToSection("hero")}>
                    <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain md:w-[36px] md:h-[36px]" />
                    <span className="text-sm md:text-lg font-semibold tracking-tight text-black">Bureau des Étudiants</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <button onClick={() => scrollToSection("hero")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Accueil</button>
                    <button onClick={() => scrollToSection("about")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">À Propos</button>
                    <button onClick={() => scrollToSection("members")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Membres</button>
                    <button onClick={() => scrollToSection("events")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Événements</button>
                    <button onClick={() => scrollToSection("contact")} className="text-xs font-bold text-slate-500 hover:text-black uppercase tracking-widest transition-all duration-200">Contact</button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="flex md:hidden items-center justify-center p-2 text-slate-600 hover:text-black z-[60]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav Overlay */}
                <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-300 md:hidden ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                    }`}>
                    <nav className="flex flex-col items-center gap-8">
                        <button onClick={() => scrollToSection("hero")} className="text-lg font-bold text-slate-800 hover:text-black uppercase tracking-widest transition-all duration-200">Accueil</button>
                        <button onClick={() => scrollToSection("about")} className="text-lg font-bold text-slate-800 hover:text-black uppercase tracking-widest transition-all duration-200">À Propos</button>
                        <button onClick={() => scrollToSection("members")} className="text-lg font-bold text-slate-800 hover:text-black uppercase tracking-widest transition-all duration-200">Membres</button>
                        <button onClick={() => scrollToSection("events")} className="text-lg font-bold text-slate-800 hover:text-black uppercase tracking-widest transition-all duration-200">Événements</button>
                        <button onClick={() => scrollToSection("contact")} className="text-lg font-bold text-slate-800 hover:text-black uppercase tracking-widest transition-all duration-200 border-2 border-black px-8 py-3 rounded-full">Contact</button>
                    </nav>
                </div>

                {/* Desktop - Right (Admin Actions / Join Us) */}
                <div className="hidden md:flex items-center gap-4 md:min-w-[150px] justify-end whitespace-nowrap">
                    {/* Admin actions are now integrated into the Hero Section buttons */}
                </div>
            </div>
        </header>
    );
}
