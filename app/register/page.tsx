"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RegisterForm } from "@/app/register/form";

const Register = () => {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL");

    const href = new URL("/login", window.location.origin);
    if (callbackURL) {
        href.searchParams.set("callbackURL", callbackURL);
    }

    return (
        <div>
            <h1 className="text-lg font-bold">Sign in</h1>
            <RegisterForm callbackURL={callbackURL} />
            <p>
                Don't have an account? <Link href={href}>Sign in</Link> instead
            </p>
        </div>
    );
};

export default Register;
