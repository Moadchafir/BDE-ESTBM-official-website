import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db-utils";
import { auth } from "@/auth";

export async function GET() {
    const db = await readDb();
    return NextResponse.json(db.events);
}

export async function POST(req: Request) {
    const session = await auth();
    if ((session?.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const db = await readDb();

    if (data.id) {
        // Edit existing
        const index = db.events.findIndex((e: any) => e.id === data.id);
        if (index !== -1) {
            db.events[index] = { ...db.events[index], ...data };
        }
    } else {
        // Add new
        const newId = Math.max(0, ...db.events.map((e: any) => e.id)) + 1;
        db.events.push({ ...data, id: newId });
    }

    await writeDb(db);
    return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
    const session = await auth();
    if ((session?.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const db = await readDb();
    db.events = db.events.filter((e: any) => e.id !== id);
    await writeDb(db);
    return NextResponse.json({ success: true });
}
