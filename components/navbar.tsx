"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div className="flex justify-between bg-secondary h-24 px-4 items-center">
            <Link href="/" className="font-black my-auto flex flex-row gap-x-1">
                <Image
                    src="/icon.svg"
                    className="my-auto size-16"
                    alt="Andrew Carnegie"
                    width={32}
                    height={32}
                />
                <p className="my-auto text-4xl">HIT</p>
            </Link>

            {data ? <SignOut /> : <SignIn />}
        </div>
    );
};
