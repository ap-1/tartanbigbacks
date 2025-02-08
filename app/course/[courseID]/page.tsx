import { getUserCourses } from "@/db/methods";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface CreateCourseParams {
    params: Promise<{ courseID: string }>;
}

const CreateCourse = async ({ params }: CreateCourseParams) => {
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

    if (!data) {
        return notFound();
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">
                <span className="font-bold">{courseID}: </span>
                {data.course.name}
            </h1>
            <p className="text-gray-700">{data.course.description}</p>
        </div>
    );
};

export default CreateCourse;
