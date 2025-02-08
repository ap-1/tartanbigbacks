"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Classes = () => {
    const { data } = authClient.useSession();

    if (!data) {
        return redirect("/login");
    }

    return <div>You are signed in</div>;
};

export default Classes;
