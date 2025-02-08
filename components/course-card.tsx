"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { Course } from "@/db/methods";
import type { KeyboardEventHandler } from "react";

interface CourseCardProps {
    course: Course;
    role: string;
}

export const CourseCard = ({ course, role }: CourseCardProps) => {
    const router = useRouter();
    const navigateToPage = () => {
        router.push(`/course/${course.id}`);
    };

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === "Enter") navigateToPage();
    };

    return (
        <div
            className="border group rounded hover:bg-secondary transition-all cursor-pointer w-72 h-24"
            onClick={navigateToPage}
            onKeyDown={onKeyDown}
        >
            <div
                className={cn(
                    "w-full h-2 rounded-t-[3px] opacity-50 transition-all group-hover:opacity-100",
                    course.color
                )}
            />
            <div className="p-6 -my-2">
                <span className="font-bold">{course.id}:</span> {course.name}
            </div>
        </div>
    );
};
