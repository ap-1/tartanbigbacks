import { type Course, getUserCourses } from "@/db/methods";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export type PagesResponse = Pick<
    Course,
    | "assignmentsEnabled"
    | "filesEnabled"
    | "forumEnabled"
    | "peopleEnabled"
    | "scheduleEnabled"
>;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const userID = searchParams.get("userID");
    const courseID = searchParams.get("courseID");

    if (!userID) {
        return NextResponse.json(
            { error: "Missing required parameter 'userID'" },
            { status: 400 }
        );
    }

    if (!courseID) {
        return NextResponse.json(
            { error: "Missing required parameter 'courseID'" },
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
        const courses = await getUserCourses(session.user.id);
        const data = courses.find(({ course }) => course.id === courseID);

        if (!data) {
            return NextResponse.json(
                { error: "User is not enrolled in course" },
                { status: 400 }
            );
        }

        const {
            assignmentsEnabled,
            filesEnabled,
            forumEnabled,
            peopleEnabled,
            scheduleEnabled,
        } = data.course;

        return NextResponse.json(
            {
                assignmentsEnabled,
                filesEnabled,
                forumEnabled,
                peopleEnabled,
                scheduleEnabled,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to get user course pages:", error);
        return NextResponse.json(
            { error: "Failed to retrieve course pages" },
            { status: 500 }
        );
    }
}
