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
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface GenericModalFormProps {
    type: "Member" | "Event";
    onSubmit: (data: any) => void;
}

export function GenericModalForm({ type, onSubmit }: GenericModalFormProps) {
    const [open, setOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy submit
        onSubmit({});
        setOpen(false);
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
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200/60 shadow-airy hover:bg-slate-100 transition-all duration-300">
                    <Plus className="h-4 w-4 text-slate-700" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New {type}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="photo" className="text-right">
                            Photo
                        </Label>
                        <Input id="photo" type="file" className="col-span-3 text-slate-600" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {type === "Member" ? "Name/Title" : "Event Name"}
                        </Label>
                        <Input id="name" placeholder={type === "Member" ? "Jane Doe" : "Annual Meetup"} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            {type === "Member" ? "Role" : "Description"}
                        </Label>
                        <Input id="desc" placeholder={type === "Member" ? "Designer" : "A brief description"} className="col-span-3" />
                    </div>
                    {type === "Member" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="socials" className="text-right">
                                Socials
                            </Label>
                            <Input id="socials" placeholder="linkedin.com/in/jane" className="col-span-3" />
                        </div>
                    )}
                    {type === "Event" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input id="date" type="date" className="col-span-3" />
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white transition-all duration-300">
                            Save {type}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
