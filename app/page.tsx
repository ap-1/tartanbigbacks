import { CourseCard } from "@/components/course-card";
import { getUserCourses } from "@/db/methods";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Home = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/login");
    }

    const courses = await getUserCourses(session.user.id);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">My Courses</h1>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,_18rem)]">
                <button
                    className="cursor-pointer transition-all hover:bg-secondary border border-dashed rounded flex flex-col p-6 w-72 h-24 items-center"
                    type="button"
                >
                    <Plus className="w-8 h-8" />
                    <p>New course</p>
                </button>

                {courses.map(({ course, role }) => (
                    <CourseCard key={course.id} course={course} role={role} />
                ))}
            </div>
        </div>
    );
};

export default Home;
