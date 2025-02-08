"use client";
import { LoginForm } from "@/app/login/form";
import { Button } from "@/components/ui/button";
import { Github, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Login = () => {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL");

    const [href, setHref] = useState("#");

    useEffect(() => {
        const href = new URL("/login", window.location.origin);
        if (callbackURL) {
            href.searchParams.set("callbackURL", callbackURL);
        }
        setHref(href.toString());
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <LoginForm callbackURL={callbackURL} />
            <Button
                type="submit"
                onClick={() => alert("GitHub Login not implemented yet")}
                className="w-80 mb-4"
                variant="secondary"
            >
                <Github /> Log in using GitHub
            </Button>
            <p>
                Already have an account?{" "}
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
        <Suspense
            fallback={<LoaderCircle className="h-screen m-auto animate-spin" />}
        >
            <Login />
        </Suspense>
    );
}
