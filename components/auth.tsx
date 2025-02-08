"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    LogIn,
    LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const SignOut = () => {
    const router = useRouter();

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    return (
        <Button onClick={signOut}>
            <LogOut /> Sign out
        </Button>
    );
};

const SignIn = () => {
    const router = useRouter();
    const [href, setHref] = useState("#");

    useEffect(() => {
        const href = new URL("/login", window.location.origin);
        href.searchParams.set("callbackURL", window.location.pathname);

        setHref(href.toString());
    });

    return (
        <Button onClick={() => router.push(href)}>
            <LogIn /> Sign in
        </Button>
    );
};

export const Auth = () => {
    const { data } = authClient.useSession();
    
    return (
        <div className="fixed right-6 top-6">
            {data ? <SignOut /> : <SignIn />}
        </div>
    )
}