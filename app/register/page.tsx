"use client";
import { RegisterForm } from "@/app/register/form";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Register = () => {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL");

    const href = new URL("/login", window.location.origin);
    if (callbackURL) {
        href.searchParams.set("callbackURL", callbackURL);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>
            <RegisterForm callbackURL={callbackURL} />
            <Button
                type="submit"
                onClick={() => alert("GitHub Login not implemented yet")}
                className="w-80 mb-4"
                variant="secondary"
            >
                <Github /> Register using GitHub
            </Button>
            <p>
                Don't have an account?{" "}
                <Link href={href} className="underline">
                    Sign in
                </Link>{" "}
                instead
            </p>
        </div>
    );
};

export default Register;
