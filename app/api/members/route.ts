import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db-utils";
import { auth } from "@/auth";

export async function GET() {
    const db = await readDb();
    return NextResponse.json(db.members);
}

export async function POST(req: Request) {
    const session = await auth();
    if ((session?.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const db = await readDb();

    // Normalize flat ig/li into nested socials object
    const { ig, li, ...rest } = data;
    const memberData = {
        ...rest,
        socials: {
            ig: ig || rest.socials?.ig || "#",
            li: li || rest.socials?.li || "#",
        },
    };

    if (memberData.id) {
        // Edit existing
        const index = db.members.findIndex((m: any) => m.id === memberData.id);
        if (index !== -1) {
            db.members[index] = { ...db.members[index], ...memberData };
        }
    } else {
        // Add new
        const newId = Math.max(0, ...db.members.map((m: any) => m.id)) + 1;
        db.members.push({ ...memberData, id: newId });
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
    db.members = db.members.filter((m: any) => m.id !== id);
    await writeDb(db);
    return NextResponse.json({ success: true });
}
