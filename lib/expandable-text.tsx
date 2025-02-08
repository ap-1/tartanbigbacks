"use client";
import { useState } from "react";

interface ExpandableTextProps {
    text: string;
    maxLength?: number;
}

export function ExpandableText({ text, maxLength = 150 }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (text.length <= maxLength) {
        return <p className="text-foreground">{text}</p>;
    }

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <p className="text-foreground">
            {isExpanded ? text : `${text.substring(0, maxLength)}...`}
            <button
                type="button"
                onClick={toggleExpand}
                className="ml-2 text-blue-500 underline focus:outline-none"
            >
                {isExpanded ? "Collapse" : "Expand"}
            </button>
        </p>
    );
}
