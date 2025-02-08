"use client";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="p-8 h-full flex justify-center items-center">
            <div className="flex flex-col gap-y-2 pb-12">
                <h1 className="text-5xl font-black">Not found</h1>
                <h2 className="text-2xl font-bold">
                    Could not find the requested resource.
                </h2>
                <div className="flex flex-row mt-2 gap-x-2">
                    <Button onClick={() => router.back()}>
                        <ChevronLeft />
                        Go back
                    </Button>
                    <Button onClick={() => router.push("/")} variant="secondary">
                        <Home />
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    );
}
