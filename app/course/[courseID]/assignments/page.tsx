import { Assignment } from "@/components/assignment";
import { getUserAssignmentsForCourse, getUserCourses } from "@/db/methods";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface CourseParams {
    params: Promise<{ courseID: string }>;
}

const Assignments = async ({ params }: CourseParams) => {
    const { courseID } = await params;
    if (!courseID || typeof courseID !== "string") {
        return notFound();
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect(`/login?redirect=/course/${courseID}/assignments`);
    }

    const courses = await getUserCourses(session.user.id);
    const data = courses.find(({ course }) => course.id === courseID);

    if (!data) {
        return notFound();
    }

    const assignments = await getUserAssignmentsForCourse(
        session.user.id,
        courseID
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-4">
                <span className="font-bold">{courseID}: </span>
                {data.course.name}
            </h1>
            {assignments.map((assignment) => (
                <Assignment key={assignment.id} doNotRedirect {...assignment} />
            ))}
        </div>
    );
};

export default Assignments;
