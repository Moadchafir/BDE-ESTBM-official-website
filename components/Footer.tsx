"use client";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone, Lock } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Footer() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", { username, password, redirect: false });
    };

    return (
        <footer className="w-full px-4 pb-4 md:pb-10 relative z-10">
            <div className="container mx-auto">
                <div className="w-full rounded-3xl border border-slate-200/80 bg-white shadow-sm p-5 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-6 md:mb-12">

                        {/* Brand Column */}
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-3 mb-3 md:mb-5">
                                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                                <span className="font-semibold text-lg md:text-xl text-black tracking-tight">Bureau des Étudiants</span>
                            </div>
                            <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed">
                                Le BDE anime et structure la vie du campus. Événements, projets, accompagnement des clubs et représentation étudiante: nous agissons pour faire de chaque année une expérience marquante.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="hidden md:block">
                            <h4 className="text-black font-bold uppercase tracking-widest text-xs mb-5">Navigation</h4>
                            <ul className="flex flex-col space-y-3">
                                {[
                                    { label: "Accueil", href: "#hero" },
                                    { label: "À Propos", href: "#about" },
                                    { label: "Membres", href: "#members" },
                                    { label: "Événements", href: "#events" },
                                    { label: "Contact", href: "#contact" },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-slate-500 text-sm hover:text-black transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col items-start text-left">
                            <h4 className="hidden md:block text-black font-bold uppercase tracking-widest text-xs mb-5">Contact</h4>
                            <ul className="space-y-3 md:space-y-4 mb-6">
                                <li className="flex items-start md:items-center gap-3 text-slate-500 text-[10px] md:text-sm justify-start">
                                    <MapPin className="w-3.5 h-3.5 text-blue-500 mt-0.5 md:mt-0 shrink-0" />
                                    <span>ESTBM, Campus universitaire M'ghila BP:591, Béni Mellal 23000</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-500 text-[10px] md:text-sm justify-start">
                                    <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                    <a href="mailto:bdeestbm@outlook.com" className="hover:text-black transition-colors">bdeestbm@outlook.com</a>
                                </li>
                                <li className="flex items-center gap-3 text-slate-500 text-[10px] md:text-sm justify-start">
                                    <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                    <span>Rabab Joumar | +212 766 530080</span>
                                </li>
                            </ul>

                            {/* Social links moved here */}
                            <div className="flex items-center gap-4 justify-center md:justify-start w-full md:w-auto">
                                <Link
                                    href="https://www.instagram.com/bde_estbm/"
                                    target="_blank"
                                    className="p-2 md:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#E4405F] hover:border-pink-200 transition-all duration-300"
                                >
                                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                                <Link
                                    href="https://linkedin.com/company/bdeestbm"
                                    target="_blank"
                                    className="p-2 md:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#0A66C2] hover:border-blue-200 transition-all duration-300"
                                >
                                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Divider + copyright */}
                    <div className="pt-4 md:pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                        <div className="flex items-center gap-3 md:gap-4">
                            <p className="text-slate-400 text-[8px] md:text-xs uppercase tracking-widest font-bold">
                                © {new Date().getFullYear()} Bureau des Étudiants.
                            </p>
                            {!isAdmin ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="text-slate-300 hover:text-slate-500 transition-colors">
                                            <Lock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[85vw] sm:max-w-[400px] p-6 rounded-3xl">
                                        <DialogHeader className="mb-2">
                                            <DialogTitle className="text-lg md:text-xl font-bold">Admin Login</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleLogin} className="space-y-4 pt-2">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-700">Username</label>
                                                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-700">Password</label>
                                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                                            </div>
                                            <button type="submit" className="btn-subrosa w-full h-11 rounded-xl mt-2">Login</button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <button onClick={() => signOut()} className="text-slate-400 text-[8px] md:text-xs hover:text-red-500 transition-colors uppercase font-bold tracking-widest">
                                    Logout
                                </button>
                            )}
                        </div>
                        <p className="text-slate-300 text-[8px] md:text-xs uppercase tracking-widest font-bold italic">
                            Built by Moad Chafir
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
