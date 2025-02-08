"use client";
import { Loader } from "@/components/loader";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const CreateCourse = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending) return <Loader />;

    if (!data) {
        redirect("/login?redirect=/course/create");
    }

    return (
        <div>
            Create a course
        </div>
    )
};

export default CreateCourse;
