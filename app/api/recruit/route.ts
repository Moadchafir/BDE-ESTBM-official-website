import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { readDb, writeDb } from "@/lib/db-utils";

export async function GET() {
    try {
        const session = await auth();
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbData = await readDb();
        const recruitRequests = dbData.recruit || [];

        // Sort by newest first
        const sortedRequests = [...recruitRequests].sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return NextResponse.json(sortedRequests);
    } catch (error) {
        console.error('Recruitment GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { role, motivation, capability, cv } = body;

        const dbData = await readDb();

        if (!dbData.recruit) {
            dbData.recruit = [];
        }

        const newSubmission = {
            id: Date.now(),
            role,
            motivation,
            capability,
            cv,
            createdAt: new Date().toISOString(),
        };

        dbData.recruit.push(newSubmission);
        await writeDb(dbData);

        return NextResponse.json({ success: true, submission: newSubmission });
    } catch (error) {
        console.error('Recruitment submission error:', error);
        return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }
}
