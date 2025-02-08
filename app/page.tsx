"use client";
import { Loader } from "@/components/loader";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Home = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending) return <Loader />;

    if (!data) {
        redirect("/login?callbackURL=/");
    }

    return <div>You are signed in</div>;
};

export default Home;
