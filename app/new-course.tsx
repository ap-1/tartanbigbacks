"use client";
import { Plus } from "lucide-react";
import type { KeyboardEventHandler } from "react";

interface NewCourseProps {
    navigateToPage: () => void;
}

export const NewCourse = ({ navigateToPage }: NewCourseProps) => {
    const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = async (e) => {
        if (e.key === "Enter") await navigateToPage();
    };

    return (
        <button
            className="cursor-pointer transition-all hover:bg-secondary border border-dashed rounded flex flex-col p-6 w-72 h-24 items-center"
            onClick={navigateToPage}
            onKeyDown={onKeyDown}
            type="button"
        >
            <Plus className="w-8 h-8" />
            <p>New course</p>
        </button>
    );
};
