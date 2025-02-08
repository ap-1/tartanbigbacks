"use client";
import { RegisterForm } from "@/app/register/form";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";
import Link from "next/link";
import { redirect as nextRedirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const Register = () => {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const [href, setHref] = useState("#");

    useEffect(() => {
        const href = new URL("/login", window.location.origin);
        const pathname = window.location.pathname.startsWith("/register")
            ? "/"
            : window.location.pathname;

        href.searchParams.set("redirect", pathname);
        setHref(href.toString());
    });

    const signInWithGitHub = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "github"
        })

        if (error) {
            toast.error(error.message);
        } else if (data) {
            toast.success("Logged in successfully");
            nextRedirect(redirect ?? "/");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>
            <RegisterForm redirect={redirect} />
            <Button
                type="submit"
                onClick={signInWithGitHub}
                className="w-80 mb-4"
                variant="secondary"
            >
                <Github /> Register using GitHub
            </Button>
            <p>
                Already have an account?{" "}
                <Link href={href} className="underline">
                    Sign in
                </Link>{" "}
                instead
            </p>
        </div>
    );
};

export default function RegisterPage() {
    return (
        <Suspense fallback={<Loader />}>
            <Register />
        </Suspense>
    );
}
