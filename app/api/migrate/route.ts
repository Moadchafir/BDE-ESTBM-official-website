import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import fs from 'fs';
import path from 'path';
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbPath = path.join(process.cwd(), 'lib/db.json');
        if (!fs.existsSync(dbPath)) {
            return NextResponse.json({ error: "db.json not found" }, { status: 404 });
        }

        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        console.log('Migrating members...');
        for (const member of data.members || []) {
            await prisma.member.upsert({
                where: { id: member.id },
                update: {},
                create: {
                    id: member.id,
                    name: member.name,
                    role: member.role,
                    src: member.src,
                    ig: member.socials?.ig || null,
                    li: member.socials?.li || null,
                    order: member.order,
                    bio: member.bio,
                },
            });
        }

        console.log('Migrating events...');
        for (const event of data.events || []) {
            await prisma.event.upsert({
                where: { id: event.id },
                update: {},
                create: {
                    id: event.id,
                    title: event.title,
                    date: event.date,
                    location: event.location,
                    type: event.type,
                    image: event.image,
                    description: event.description,
                },
            });
        }

        console.log('Migrating recruitment requests...');
        for (const recruit of data.recruit || []) {
            await prisma.recruit.create({
                data: {
                    fullName: recruit.fullName || "Ancien Candidat",
                    email: recruit.email || "inconnu@estbm.ac.ma",
                    phoneNumber: recruit.phoneNumber || "0000000000",
                    role: recruit.role,
                    motivation: recruit.motivation,
                    capability: recruit.capability,
                    cv: recruit.cv,
                    createdAt: new Date(recruit.createdAt),
                },
            });
        }

        console.log('Migrating contact requests...');
        for (const contact of data.contact || []) {
            await prisma.contact.create({
                data: {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                    subject: contact.subject,
                    message: contact.message,
                    createdAt: new Date(contact.createdAt),
                },
            });
        }

        return NextResponse.json({ success: true, message: "Migration completed successfully" });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({ error: 'Migration failed', details: (error as any).message }, { status: 500 });
    }
}
