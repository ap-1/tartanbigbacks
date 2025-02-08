"use client";
import type { getUserAssignments } from "@/db/methods";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { KeyboardEventHandler } from "react";

export type Assignments = Awaited<ReturnType<typeof getUserAssignments>>;
export type AssignmentProps = Assignments[number] & {
    doNotRedirect?: boolean;
};

export const Assignment = ({
    name,
    description,
    courseId,
    dueDate,
    doNotRedirect = false,
}: AssignmentProps) => {
    const router = useRouter();
    const date = new Date(dueDate as unknown as string);

    const navigateToAssignment = () => {
        if (!doNotRedirect) {
            router.push(`/course/${courseId}/assignments`);
        }
    };

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = async (e) => {
        if (e.key === "Enter") await navigateToAssignment();
    };

    return (
        <div
            className={cn(
                "rounded border p-4 mt-4",
                !doNotRedirect && "cursor-pointer hover:bg-secondary"
            )}
            onClick={navigateToAssignment}
            onKeyDown={onKeyDown}
        >
            <span className="bg-red-300 text-red-800 rounded-lg px-2">
                {date.toLocaleDateString()}
            </span>{" "}
            <span className="bg-red-300 text-red-800 rounded-lg px-2">
                {date.toLocaleTimeString()}
            </span>
            <br />
            <span className="bg-blue-300 text-blue-800 rounded-lg px-2">
                {courseId}
            </span>{" "}
            <span className="bg-blue-300 text-blue-800 rounded-lg px-2">
                {name}
            </span>
            <br />
            {description}
        </div>
    );
};
