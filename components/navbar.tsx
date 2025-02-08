"use client";
import { authClient } from "@/lib/auth-client";
import { GraduationCap, LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export const Navbar = () => {
    const { data } = authClient.useSession();

    return (
        <div className="flex justify-between bg-secondary h-16 px-4 items-center">
            <Link
                href="/"
                className="text-2xl font-black my-auto flex flex-row gap-x-1"
            >
                <GraduationCap className="my-auto size-8" />
                <p className="my-auto">THX</p>
            </Link>

            {data ? <SignOut /> : <SignIn />}
        </div>
    );
};
