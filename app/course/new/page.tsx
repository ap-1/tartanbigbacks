import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CreateCourse = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/login?redirect=/course/new");
    }

    return (
        <div className="p-8">
             <h1 className="text-3xl font-bold mb-6">Create a course</h1>
        </div>
    )
};

export default CreateCourse;
