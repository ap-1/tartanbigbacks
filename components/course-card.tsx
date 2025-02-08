"use client";
import type { Course } from "@/db/methods";
import { cn } from "@/lib/utils";
import { Archive } from "lucide-react";
import { useRouter } from "next/navigation";
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

    const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === "Enter") navigateToPage();
    };

    return (
        <button
            className={cn(
                "relative border rounded w-72 h-24",
                course.archived
                    ? "cursor-not-allowed"
                    : "group hover:bg-secondary transition-all cursor-pointer"
            )}
            onClick={navigateToPage}
            onKeyDown={onKeyDown}
            disabled={course.archived}
            type="button"
        >
            {course.archived && (
                <Archive className="absolute bottom-2 right-2 size-6" />
            )}

            <div
                className={cn(
                    "w-full h-2 -my-[6px] rounded-t-[3px] transition-all opacity-50 group-hover:opacity-100",
                    course.archived ? "bg-muted-foreground" : course.color
                )}
            />
            <div className="p-6 -my-2">
                <span className="font-bold">{course.id}:</span> {course.name}
            </div>
        </button>
    );
};
