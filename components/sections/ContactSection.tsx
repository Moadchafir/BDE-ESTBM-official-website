"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactSection() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        console.log("Contact Form Data:", formData);
        setIsSubmitted(true);
        // Reset after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <section id="contact" className="w-full min-h-[90vh] py-12 px-4 relative z-10 flex flex-col justify-center">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">Prenez Contact</h2>
                    <p className="text-slate-600 mt-4 text-lg">Une question ou envie de collaborer ? Envoyez-nous un message.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-2xl p-8 md:p-12 mx-auto relative overflow-hidden"
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
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-slate-700">Prénom</Label>
                                    <Input id="firstName" placeholder="Jane" className="bg-slate-50 border-slate-200 text-black" required onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-slate-700">Nom</Label>
                                    <Input id="lastName" placeholder="Doe" className="bg-slate-50 border-slate-200 text-black" required onChange={handleChange} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700">Email</Label>
                                <Input id="email" type="email" placeholder="jane@example.com" className="bg-slate-50 border-slate-200 text-black" required onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-slate-700">Objet</Label>
                                <Input id="subject" placeholder="Sujet de votre message" className="bg-slate-50 border-slate-200 text-black" required onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-slate-700">Message</Label>
                                <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" className="min-h-[120px] bg-slate-50 border-slate-200 text-black" required onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn-subrosa w-full py-4 text-sm mt-4">
                                Envoyer le message
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
