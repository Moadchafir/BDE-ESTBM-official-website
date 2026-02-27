"use client";

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, ClipboardList, MessageSquare, Calendar, ExternalLink, User, X, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function HeroSection() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    // Recruitment Form State
    const [isSubmittingRecruit, setIsSubmittingRecruit] = useState(false);
    const [isRecruitSuccess, setIsRecruitSuccess] = useState(false);
    const [recruitFormData, setRecruitFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "",
        motivation: "",
        capability: "",
        cv: "",
    });

    // Admin Viewers State
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoadingRequests, setIsLoadingRequests] = useState(false);

    const fetchRequests = async (type: 'recruit' | 'contact') => {
        setIsLoadingRequests(true);
        try {
            const res = await fetch(`/api/${type}`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (error) {
            console.error(`Failed to fetch ${type} requests:`, error);
        } finally {
            setIsLoadingRequests(false);
        }
    };

    const handleRecruitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setRecruitFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleRecruitSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingRecruit(true);
        try {
            const res = await fetch("/api/recruit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recruitFormData),
            });
            if (res.ok) {
                setIsRecruitSuccess(true);
                setRecruitFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    role: "",
                    motivation: "",
                    capability: "",
                    cv: ""
                });
            }
        } catch (error) {
            console.error("Recruitment submission error:", error);
        } finally {
            setIsSubmittingRecruit(false);
        }
    };

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
                        {/* FIRST BUTTON: Join Us or Recruit Requests */}
                        <Dialog onOpenChange={(open) => { if (!open) setIsRecruitSuccess(false); }}>
                            <DialogTrigger asChild>
                                <button
                                    className="btn-subrosa px-12 py-4 text-sm flex items-center gap-2"
                                    onClick={() => isAdmin && fetchRequests('recruit')}
                                >
                                    {isAdmin && <ClipboardList className="w-4 h-4" />}
                                    {isAdmin ? "Demandes de Recrutement" : "Nous Rejoindre"}
                                </button>
                            </DialogTrigger>
                            <DialogContent className={`${isAdmin ? 'sm:max-w-[800px]' : 'sm:max-w-[500px]'} h-[85vh] overflow-hidden flex flex-col bg-white p-0 border-none shadow-2xl text-black`}>
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-black flex items-center gap-3">
                                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                                                <ClipboardList className="w-5 h-5" />
                                            </div>
                                            {isAdmin ? "Demandes de Recrutement" : "Rejoindre la Communauté"}
                                        </DialogTitle>
                                    </DialogHeader>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
                                    {isAdmin ? (
                                        isLoadingRequests ? (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                                                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                                <p className="text-sm font-medium">Chargement des candidatures...</p>
                                            </div>
                                        ) : requests.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 py-20">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                    <X className="w-8 h-8" />
                                                </div>
                                                <p className="text-lg font-medium text-slate-600">Aucune demande reçue pour le moment.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {requests.map((req) => (
                                                    <div key={req.id} className="group border border-slate-100 rounded-2xl p-6 hover:shadow-airy transition-all duration-300 bg-white">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                                                                    <User className="w-6 h-6" />
                                                                </div>
                                                                <div>
                                                                    <h5 className="text-sm font-bold text-black mb-0.5">{req.fullName}</h5>
                                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                                                            {req.role}
                                                                        </span>
                                                                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                                                            <MessageSquare className="w-3 h-3" />
                                                                            {req.email}
                                                                        </span>
                                                                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                                                            <Zap className="w-3 h-3" />
                                                                            {req.phoneNumber}
                                                                        </span>
                                                                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                                                            <Calendar className="w-3 h-3" />
                                                                            {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {req.cv && (
                                                                <a
                                                                    href={req.cv}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full px-5 py-2.5 transition-all"
                                                                >
                                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                                    Voir CV / Portfolio
                                                                </a>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Motivation</h5>
                                                                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100/50 italic">
                                                                    &quot;{req.motivation}&quot;
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacités</h5>
                                                                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                                                                    {req.capability}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        isRecruitSuccess ? (
                                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10">
                                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                                </div>
                                                <h3 className="text-xl font-bold text-black">Demande Envoyée !</h3>
                                                <p className="text-slate-500">Merci de votre intérêt. Notre équipe étudiera votre candidature avec attention.</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleRecruitSubmit} className="grid gap-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="flex flex-col gap-2">
                                                        <Label htmlFor="fullName" className="text-slate-700 font-semibold">Nom Complet</Label>
                                                        <Input
                                                            id="fullName"
                                                            value={recruitFormData.fullName}
                                                            onChange={handleRecruitChange}
                                                            placeholder="Votre nom et prénom"
                                                            className="h-12 bg-slate-50 border-slate-200 text-black rounded-xl px-4 focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label htmlFor="email" className="text-slate-700 font-semibold">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={recruitFormData.email}
                                                            onChange={handleRecruitChange}
                                                            placeholder="votre@email.com"
                                                            className="h-12 bg-slate-50 border-slate-200 text-black rounded-xl px-4 focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="flex flex-col gap-2">
                                                        <Label htmlFor="phoneNumber" className="text-slate-700 font-semibold">Téléphone</Label>
                                                        <Input
                                                            id="phoneNumber"
                                                            value={recruitFormData.phoneNumber}
                                                            onChange={handleRecruitChange}
                                                            placeholder="+212 ..."
                                                            className="h-12 bg-slate-50 border-slate-200 text-black rounded-xl px-4 focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label htmlFor="role" className="text-slate-700 font-semibold">Rôle Souhaité</Label>
                                                        <select
                                                            id="role"
                                                            value={recruitFormData.role}
                                                            onChange={handleRecruitChange}
                                                            className="w-full h-12 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-black transition-all"
                                                            required
                                                        >
                                                            <option value="" disabled>Sélectionnez un département</option>
                                                            <option value="comm">Communication & Logistics</option>
                                                            <option value="hr">HR</option>
                                                            <option value="design">Design</option>
                                                            <option value="social">SocialMedia & Content Creation</option>
                                                            <option value="secretary">Secretary</option>
                                                            <option value="finance">Finance & Sponsorship</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="motivation" className="text-slate-700 font-semibold">Pourquoi nous rejoindre ?</Label>
                                                    <Textarea
                                                        id="motivation"
                                                        value={recruitFormData.motivation}
                                                        onChange={handleRecruitChange}
                                                        placeholder="Dites-nous en plus sur vous et vos motivations..."
                                                        className="min-h-[120px] bg-slate-50 border-slate-200 text-black rounded-xl p-4 focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="capability" className="text-slate-700 font-semibold">Preuve de Capacité</Label>
                                                    <Textarea
                                                        id="capability"
                                                        value={recruitFormData.capability}
                                                        onChange={handleRecruitChange}
                                                        placeholder="Décrivez vos compétences ou projets passés..."
                                                        className="min-h-[120px] bg-slate-50 border-slate-200 text-black rounded-xl p-4 focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="cv" className="text-slate-700 font-semibold">CV / Portfolio Link (Optionnel)</Label>
                                                    <Input
                                                        id="cv"
                                                        value={recruitFormData.cv}
                                                        onChange={handleRecruitChange}
                                                        placeholder="URL vers votre CV ou portfolio"
                                                        className="bg-slate-50 border-slate-200 text-black rounded-xl h-12 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                    />
                                                </div>
                                                <div className="flex justify-end pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmittingRecruit}
                                                        className="btn-subrosa w-full sm:w-auto px-10 py-4 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                                    >
                                                        {isSubmittingRecruit ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                Envoi en cours...
                                                            </>
                                                        ) : (
                                                            "Envoyer la demande"
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        )
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* SECOND BUTTON: Collaborate or Collaboration Requests */}
                        {isAdmin ? (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        className="btn-subrosa-outline px-12 py-4 text-sm flex items-center gap-2"
                                        onClick={() => fetchRequests('contact')}
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Demandes de Collaboration
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px] h-[85vh] overflow-hidden flex flex-col bg-white p-0 border-none shadow-2xl text-black">
                                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-black flex items-center gap-3">
                                                <div className="p-2 bg-blue-600 rounded-lg text-white">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                Demandes de Collaboration
                                            </DialogTitle>
                                        </DialogHeader>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar pt-4">
                                        {isLoadingRequests ? (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                                                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                                <p className="text-sm font-medium">Chargement des messages...</p>
                                            </div>
                                        ) : requests.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 py-20">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                    <X className="w-8 h-8" />
                                                </div>
                                                <p className="text-lg font-medium text-slate-600">Aucun message de collaboration reçu.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {requests.map((req) => (
                                                    <div key={req.id} className="border border-slate-100 rounded-2xl p-6 bg-white hover:shadow-airy transition-all duration-300">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h4 className="text-lg font-bold text-black">{req.firstName} {req.lastName}</h4>
                                                                <p className="text-xs text-blue-600 font-semibold">{req.email}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Date</p>
                                                                <p className="text-xs text-slate-900 font-medium">
                                                                    {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50 mb-4">
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Objet: {req.subject}</p>
                                                            <p className="text-sm text-slate-700 leading-relaxed italic">&quot;{req.message}&quot;</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <button
                                className="btn-subrosa-outline px-12 py-4 text-sm"
                                onClick={() => {
                                    const contact = document.getElementById("contact");
                                    contact?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Collaborer avec nous
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
