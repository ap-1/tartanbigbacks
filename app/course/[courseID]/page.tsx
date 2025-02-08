import { getUserCourses } from "@/db/methods";
import { auth } from "@/lib/auth";
import { ExpandableText } from "@/lib/expandable-text";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface CourseParams {
    params: Promise<{ courseID: string }>;
}

const Course = async ({ params }: CourseParams) => {
    const { courseID } = await params;
    if (!courseID || typeof courseID !== "string") {
        return notFound();
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect(`/login?redirect=/course/${courseID}`);
    }

    const courses = await getUserCourses(session.user.id);
    const data = courses.find(({ course }) => course.id === courseID);

    if (!data || data.course.archived) {
        return notFound();
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-4">
                <span className="font-bold">{courseID}: </span>
                {data.course.name}
            </h1>
            <ExpandableText text={data.course.description} />
        </div>
    );
};

export default Course;
