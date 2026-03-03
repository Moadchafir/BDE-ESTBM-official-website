"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export function ContactSection() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
            } else {
                setError("Une erreur est survenue lors de l'envoi du message.");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <section id="contact" className="w-full pt-6 pb-16 md:py-24 px-4 relative flex flex-col">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">Prenez Contact</h2>
                    <p className="text-slate-600 mt-3 md:mt-4 text-base md:text-lg">Une question ou envie de collaborer ? Envoyez-nous un message.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-2xl p-6 md:p-12 mx-auto relative overflow-hidden"
                >
                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-12 text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-2">Message Envoyé !</h3>
                            <p className="text-slate-600">Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
                            >
                                Envoyer un autre message
                            </button>
                        </motion.div>
                    ) : (
                        <form className="space-y-3 md:space-y-6 scale-[0.95] origin-top md:scale-100" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="firstName" className="text-slate-700 font-medium text-xs md:text-sm">Prénom</Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        placeholder="Jane"
                                        className="bg-slate-50 border-slate-200 text-black h-9 md:h-12 text-sm"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="lastName" className="text-slate-700 font-medium text-xs md:text-sm">Nom</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        placeholder="Doe"
                                        className="bg-slate-50 border-slate-200 text-black h-9 md:h-12 text-sm"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-medium text-xs md:text-sm">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    placeholder="jane@example.com"
                                    className="bg-slate-50 border-slate-200 text-black h-9 md:h-12 text-sm"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <Label htmlFor="subject" className="text-slate-700 font-medium text-xs md:text-sm">Objet</Label>
                                <Input
                                    id="subject"
                                    value={formData.subject}
                                    placeholder="Sujet de votre message"
                                    className="bg-slate-50 border-slate-200 text-black h-9 md:h-12 text-sm"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <Label htmlFor="message" className="text-slate-700 font-medium text-xs md:text-sm">Message</Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    className="min-h-[90px] md:min-h-[150px] bg-slate-50 border-slate-200 text-black text-sm"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-xs mt-1">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-subrosa w-full py-2.5 md:py-4 text-[11px] md:text-sm mt-3 disabled:opacity-50 flex items-center justify-center gap-2 h-12 md:h-14"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    "Envoyer le message"
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
