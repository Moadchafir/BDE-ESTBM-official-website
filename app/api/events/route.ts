import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const events = await prisma.event.findMany();

        // Sorting logic can be done in the query if desired, 
        // but for now keeping it simple to match previous behavior
        const sortedEvents = [...events].sort((a: any, b: any) => {
            const dateA = new Date(a.date.split(' ').reverse().join(' '));
            const dateB = new Date(b.date.split(' ').reverse().join(' '));
            return dateB.getTime() - dateA.getTime();
        });

        return NextResponse.json(sortedEvents);
    } catch (error) {
        console.error('Events GET error:', error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, date, location, type, image, description } = body;

        const event = await prisma.event.create({
            data: {
                title,
                date,
                location,
                type,
                image,
                description
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error('Events POST error:', error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, title, date, location, type, image, description } = body;

        if (!id) {
            return NextResponse.json({ error: "Event ID required" }, { status: 400 });
        }

        const event = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                title,
                date,
                location,
                type,
                image,
                description
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error('Events PATCH error:', error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        let id = searchParams.get("id");

        if (!id) {
            try {
                const body = await req.json();
                id = body.id;
            } catch (e) {
                // No body or invalid body
            }
        }

        if (!id) {
            return NextResponse.json({ error: "Event ID required" }, { status: 400 });
        }

        await prisma.event.delete({
            where: { id: parseInt(id.toString()) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Events DELETE error:', error);
        return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
    }
}
