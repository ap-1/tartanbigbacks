"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Home = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending) return <Loader />;

    if (!data) {
        redirect("/login");
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">My Courses</h1>
            
        </div>
    );
};

export default Home;
