"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
    return (
        <section id="contact" className="w-full py-24 px-4 relative z-10">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">Prenez Contact</h2>
                    <p className="text-slate-600 mt-4 text-lg">Une question ou envie de collaborer ? Envoyez-nous un message.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-2xl p-8 md:p-12 mx-auto"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-slate-700">Prénom</Label>
                                <Input id="firstName" placeholder="Jane" className="bg-slate-50 border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-slate-700">Nom</Label>
                                <Input id="lastName" placeholder="Doe" className="bg-slate-50 border-slate-200" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emailContact" className="text-slate-700">Email</Label>
                            <Input id="emailContact" type="email" placeholder="jane@example.com" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-slate-700">Message</Label>
                            <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" className="min-h-[120px] bg-slate-50 border-slate-200" />
                        </div>
                        <button type="submit" className="btn-subrosa w-full py-4 text-sm">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
