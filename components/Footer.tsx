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
        <footer className="w-full mt-24 px-4 pb-10 relative z-10">
            <div className="container mx-auto">
                <div className="w-full rounded-3xl border border-slate-200/80 bg-white shadow-sm p-10 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                        {/* Brand Column */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                                <span className="font-semibold text-xl text-black tracking-tight">Bureau des Étudiants</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Le BDE anime et structure la vie du campus. Événements, projets, accompagnement des clubs et représentation étudiante: nous agissons pour faire de chaque année une expérience marquante.
                            </p>
                            {/* Social links */}
                            <div className="flex items-center gap-4 mt-6">
                                <Link
                                    href="https://www.instagram.com/bde_estbm/"
                                    target="_blank"
                                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#E4405F] hover:border-pink-200 transition-all duration-300"
                                >
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="https://linkedin.com/company/bdeestbm"
                                    target="_blank"
                                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#0A66C2] hover:border-blue-200 transition-all duration-300"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-black font-bold uppercase tracking-widest text-xs mb-5">Navigation</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "Accueil", href: "#hero" },
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
                        <div>
                            <h4 className="text-black font-bold uppercase tracking-widest text-xs mb-5">Contact</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-slate-500 text-sm">
                                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>ESTBM, Campus universitaire M'ghila BP:591, Béni Mellal 23000</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-500 text-sm">
                                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                                    <a href="mailto:bdeestbm@outlook.com" className="hover:text-black transition-colors">bdeestbm@outlook.com</a>
                                </li>
                                <li className="flex items-center gap-3 text-slate-500 text-sm">
                                    <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span>+212 766 530080</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider + copyright */}
                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">
                                © {new Date().getFullYear()} Bureau des Étudiants.
                            </p>
                            {!isAdmin ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="text-slate-300 hover:text-slate-500 transition-colors">
                                            <Lock className="w-3 h-3" />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[400px]">
                                        <DialogHeader>
                                            <DialogTitle>Admin Login</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleLogin} className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Username</label>
                                                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Password</label>
                                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                                            </div>
                                            <button type="submit" className="btn-subrosa w-full py-2">Login</button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <button onClick={() => signOut()} className="text-slate-400 text-xs hover:text-red-500 transition-colors uppercase font-bold tracking-widest">
                                    Logout
                                </button>
                            )}
                        </div>
                        <p className="text-slate-300 text-xs uppercase tracking-widest font-bold italic">
                            Built by Moad Chafir
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
