"use client";
import { authClient } from "@/lib/auth-client";
import { GraduationCap, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
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
        <div className="flex justify-between bg-secondary h-16 px-4 items-center">
            <h1 className="text-2xl font-black my-auto flex flex-row gap-x-1">
                <GraduationCap className="my-auto size-8" />
                <p className="my-auto">THX</p>
            </h1>

            <Button onClick={signOut}>
                <LogOut /> Sign out
            </Button>
        </div>
    );
};
