import {
    getPeopleInCourse,
    getSharedCoursesWithUser,
    getUserCourses,
} from "@/db/methods";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PersonProps = Awaited<ReturnType<typeof getPeopleInCourse>>[number];

const Person = async ({ id, name, email, role }: PersonProps) => {
    const sharedCourses = await getSharedCoursesWithUser(id);

    return (
        <div className="rounded border p-4 my-4">
            <h2 className="text-xl">
                <span className="font-bold">{name} </span>&middot;
                <span> {role}</span>
            </h2>
            <Link href={`mailto:${email}`} className="underline text-blue-500">
                {email}
            </Link>
            <p className="mt-2">
                Shares{" "}
                {sharedCourses
                    .map((course) => course.id)
                    .map((id, i) => (
                        <span
                            key={id}
                            className={cn(
                                i % 2 === 0
                                    ? "bg-blue-300 text-blue-800"
                                    : "bg-red-300 text-red-800",
                                "rounded-lg px-2"
                            )}
                        >
                            {id}
                        </span>
                    ))
                    //@ts-ignore
                    .reduce((prev, curr) => [prev, ", ", curr])}{" "}
                with you
            </p>
        </div>
    );
};

interface CourseParams {
    params: Promise<{ courseID: string }>;
}

const People = async ({ params }: CourseParams) => {
    const { courseID } = await params;
    if (!courseID || typeof courseID !== "string") {
        return notFound();
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect(`/login?redirect=/course/${courseID}/people`);
    }

    const courses = await getUserCourses(session.user.id);
    const data = courses.find(({ course }) => course.id === courseID);

    if (!data || data.course.archived) {
        return notFound();
    }

    const people = await getPeopleInCourse(courseID);
    const roleOrder: Record<string, number> = {
        professor: 1,
        ta: 2,
        student: 3,
    };

    const sortedPeople = [...people].sort((a, b) => {
        const roleDiff = roleOrder[a.role] - roleOrder[b.role];
        if (roleDiff !== 0) {
            return roleDiff;
        }

        return a.name.localeCompare(b.name);
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-4">
                <span className="font-bold">{courseID}: </span>
                {data.course.name}
            </h1>
            {sortedPeople.map((person) => (
                <Person key={person.id} {...person} />
            ))}
        </div>
    );
};

export default People;
