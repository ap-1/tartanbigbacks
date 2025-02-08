"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Classes = () => {
    const { data } = authClient.useSession();

    if (!data) {
        redirect("/login?callbackURL=/classes");
    }

    return <div>You are signed in</div>;
};

export default Classes;
