"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";

interface GenericModalFormProps {
    type: "Member" | "Event";
    initialData?: any;
    onSuccess: () => void;
}

export function GenericModalForm({ type, initialData, onSuccess }: GenericModalFormProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<any>(initialData || {});

    useEffect(() => {
        if (open) {
            setFormData(initialData || {});
        }
    }, [open, initialData]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = type === "Member" ? "/api/members" : "/api/events";
        const isEdit = !!initialData?.id;

        try {
            const res = await fetch(endpoint, {
                method: isEdit ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setOpen(false);
                onSuccess();
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200/60 shadow-airy hover:bg-slate-100 transition-all duration-300">
                <Plus className="h-4 w-4 text-slate-700" />
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {initialData ? (
                    <button className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                ) : (
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200/60 shadow-airy hover:bg-slate-100 transition-all duration-300">
                        <Plus className="h-4 w-4 text-slate-700" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-white text-black rounded-2xl p-6">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit" : "Add New"} {type}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="image">
                            {type === "Member" ? "Image URL" : "Image URLs (comma-separated)"}
                        </Label>
                        <Input
                            id={type === "Member" ? "src" : "image"}
                            placeholder={type === "Member" ? "https://example.com/image.jpg" : "url1.jpg, url2.jpg"}
                            className="text-black h-11"
                            value={formData[type === "Member" ? "src" : "image"] || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            {type === "Member" ? "Name" : "Title"}
                        </Label>
                        <Input
                            id={type === "Member" ? "name" : "title"}
                            placeholder={type === "Member" ? "Jane Doe" : "Annual Meetup"}
                            className="text-black h-11"
                            value={formData[type === "Member" ? "name" : "title"] || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {type === "Member" ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="role">
                                Role
                            </Label>
                            <Input
                                id="role"
                                placeholder="Présidente"
                                className="text-black h-11"
                                value={formData.role || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="A brief description"
                                className="min-h-[100px] text-black"
                                value={formData.description || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    {type === "Member" && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="order">
                                    Order
                                </Label>
                                <Input
                                    id="order"
                                    type="number"
                                    placeholder="1"
                                    className="text-black h-11"
                                    value={formData.order || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bio">
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    placeholder="Short description..."
                                    className="text-black h-11"
                                    value={formData.bio || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="ig">
                                    Instagram
                                </Label>
                                <Input
                                    id="ig"
                                    placeholder="https://instagram.com/..."
                                    className="text-black h-11"
                                    value={formData.ig || formData.socials?.ig || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="li">
                                    LinkedIn
                                </Label>
                                <Input
                                    id="li"
                                    placeholder="https://linkedin.com/in/..."
                                    className="text-black h-11"
                                    value={formData.li || formData.socials?.li || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    {type === "Event" && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="date">
                                    Date
                                </Label>
                                <Input
                                    id="date"
                                    type="text"
                                    placeholder="15 Sep 2025"
                                    className="text-black h-11"
                                    value={formData.date || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="location">
                                    Lieu
                                </Label>
                                <Input
                                    id="location"
                                    placeholder="Grand Amphi"
                                    className="text-black h-11"
                                    value={formData.location || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="type">
                                    Type
                                </Label>
                                <select
                                    id="type"
                                    className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-slate-950"
                                    value={formData.type || ""}
                                    onChange={handleChange as any}
                                    required
                                >
                                    <option value="" disabled>Sélectionnez un type</option>
                                    <option value="Représentation">Représentation</option>
                                    <option value="Activité">Activité</option>
                                    <option value="Voyage">Voyage</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div className="flex justify-end mt-4">
                        <Button type="submit" className="bg-black hover:bg-black/90 text-white transition-all duration-300 rounded-full px-8 py-6 w-full md:w-auto font-bold uppercase tracking-widest text-xs shadow-lg">
                            Save {type}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
