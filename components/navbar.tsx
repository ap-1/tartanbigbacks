"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
        <div className="flex justify-between">
            <p>navbar</p>
            <button type="button" onClick={signOut}>
                sign out
            </button>
        </div>
    );
};
