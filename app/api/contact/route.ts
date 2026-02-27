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
        const contactRequests = dbData.contact || [];

        // Sort by newest first
        const sortedRequests = [...contactRequests].sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return NextResponse.json(sortedRequests);
    } catch (error) {
        console.error('Contact GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, subject, message } = body;

        const dbData = await readDb();

        if (!dbData.contact) {
            dbData.contact = [];
        }

        const newSubmission = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            subject,
            message,
            createdAt: new Date().toISOString(),
        };

        dbData.contact.push(newSubmission);
        await writeDb(dbData);

        return NextResponse.json({ success: true, submission: newSubmission });
    } catch (error) {
        console.error('Contact submission error:', error);
        return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }
}
