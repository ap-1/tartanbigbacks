import { type NextRequest, NextResponse } from "next/server";
import { getUserAssignments } from "@/db/methods";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
        return NextResponse.json(
            { error: "Missing required parameter 'userID'" },
            { status: 400 }
        );
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/login");
    }

    try {
        const assignments = await getUserAssignments(userID);
        return NextResponse.json(assignments, { status: 200 });
    } catch (error) {
        console.error("Failed to get user assignments:", error);
        return NextResponse.json(
            { error: "Failed to retrieve assignments" },
            { status: 500 }
        );
    }
}
