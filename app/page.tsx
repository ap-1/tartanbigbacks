"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Home = () => {
    const { data } = authClient.useSession();

    if (!data) {
        redirect("/login?callbackURL=/");
    }

    return <div>You are signed in</div>;
};

export default Home;
