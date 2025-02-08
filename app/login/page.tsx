"use client";
import { LoginForm } from "@/app/login/form";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";
import Link from "next/link";
import { redirect as nextRedirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const [href, setHref] = useState("#");

    useEffect(() => {
        const href = new URL("/register", window.location.origin);
        const pathname = window.location.pathname.startsWith("/login")
            ? "/"
            : window.location.pathname;

        href.searchParams.set("redirect", pathname);
        setHref(href.toString());
    });

    const signInWithGitHub = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "github",
        });

        if (error) {
            toast.error(error.message);
        } else if (data) {
            toast.success("Logged in successfully");
            nextRedirect(redirect ?? "/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <LoginForm redirect={redirect} />
            <Button
                type="submit"
                onClick={signInWithGitHub}
                className="w-80 mb-4"
                variant="secondary"
            >
                <Github /> Log in using GitHub
            </Button>
            <p>
                Don't have an account?{" "}
                <Link href={href} className="underline">
                    Sign up
                </Link>{" "}
                instead
            </p>
        </div>
    );
};

export default function LoginPage() {
    return (
        <Suspense fallback={<Loader />}>
            <Login />
        </Suspense>
    );
}
