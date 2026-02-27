import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const members = await prisma.member.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(members);
    } catch (error) {
        console.error('Members GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, role, src, socials, order, bio } = body;

        const member = await prisma.member.create({
            data: {
                name,
                role,
                src,
                ig: socials?.ig || null,
                li: socials?.li || null,
                order: order.toString(),
                bio
            }
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error('Members POST error:', error);
        return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, name, role, src, socials, order, bio } = body;

        if (!id) {
            return NextResponse.json({ error: "Member ID required" }, { status: 400 });
        }

        const member = await prisma.member.update({
            where: { id: parseInt(id) },
            data: {
                name,
                role,
                src,
                ig: socials?.ig || body.ig || null,
                li: socials?.li || body.li || null,
                order: order?.toString(),
                bio
            }
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error('Members PATCH error:', error);
        return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        let id = searchParams.get('id');

        if (!id) {
            try {
                const body = await req.json();
                id = body.id;
            } catch (e) {
                // No body or invalid body
            }
        }

        if (!id) {
            return NextResponse.json({ error: "Member ID required" }, { status: 400 });
        }

        await prisma.member.delete({
            where: { id: parseInt(id.toString()) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Members DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
    }
}
