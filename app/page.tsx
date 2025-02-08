import { NewCourse } from "@/app/new-course";
import { CourseCard } from "@/components/course-card";
import { getUserCourses } from "@/db/methods";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/login");
    }

    const courses = await getUserCourses(session.user.id);

    const navigateToPage = async () => {
        "use server";
        redirect("/course/new");
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">My Courses</h1>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,_18rem)]">
                <NewCourse navigateToPage={navigateToPage} />

                {courses.map(({ course, role }) => (
                    <CourseCard key={course.id} course={course} role={role} />
                ))}
            </div>
        </div>
    );
};

export default Home;
