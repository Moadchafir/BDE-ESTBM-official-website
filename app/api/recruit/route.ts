import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const recruits = await prisma.recruit.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(recruits);
    } catch (error) {
        console.error('Recruit GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phoneNumber, role, motivation, capability, cv } = body;

        const recruit = await prisma.recruit.create({
            data: {
                fullName,
                email,
                phoneNumber,
                role,
                motivation,
                capability,
                cv
            }
        });

        return NextResponse.json({ success: true, recruit });
    } catch (error) {
        console.error('Recruit POST error:', error);
        return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }
}
