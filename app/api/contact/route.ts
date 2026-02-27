import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Contact GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, subject, message } = body;

        const contact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                subject,
                message
            }
        });

        return NextResponse.json({ success: true, contact });
    } catch (error) {
        console.error('Contact POST error:', error);
        return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }
}
