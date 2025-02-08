"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/app/login/form";

const Login = () => {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL");

    const href = new URL("/register", window.location.origin);
    if (callbackURL) {
        href.searchParams.set("callbackURL", callbackURL);
    }

    return (
        <div>
            <h1 className="text-lg font-bold">Sign in</h1>
            <LoginForm callbackURL={callbackURL} />
            <p>
                Already have an account? <Link href={href}>Sign up</Link>{" "}
                instead
            </p>
        </div>
    );
};

export default Login;
