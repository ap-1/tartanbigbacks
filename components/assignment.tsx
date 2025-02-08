"use client";
import { Button } from "@/components/ui/button";
import type { getUserAssignments } from "@/db/methods";
import { ExpandableText } from "@/lib/expandable-text";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { KeyboardEventHandler } from "react";
import { useRef, useState } from "react";

export type Assignments = Awaited<ReturnType<typeof getUserAssignments>>;
export type AssignmentProps = Assignments[number] & {
    doNotRedirect?: boolean;
};

export const Assignment = ({
    name,
    description,
    courseId,
    dueDate,
    color,
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

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [styleViolations, setStyleViolations] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileSubmit = async () => {
        setStyleViolations(null);
        if (!selectedFile) {
            setResponseMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setResponseMessage("Waiting for autograder...");
            const response = await fetch(
                'https://54.226.164.65:5000/submit/no_none',
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result = await response.json();
            const tc_results = result.tests
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                .map((val: any) => (val ? "✅" : "❌"))
                .join("");

            setResponseMessage(
                `Test results:\n${tc_results}\nComments on style:`
            );
            setStyleViolations(result.style);
        } catch (error) {
            console.error("Error submitting file:", error);
            setResponseMessage("Failed to upload file. Please try again.");
        }
    };

    return (
        <div
            className={cn(
                "group/assignment relative rounded border mt-4",
                !doNotRedirect && "cursor-pointer hover:bg-secondary"
            )}
            onClick={navigateToAssignment}
            onKeyDown={onKeyDown}
        >
            <div className={`w-full h-2 rounded-t-[3px] transition-all opacity-50 group-hover/assignment:opacity-100 ${color}`} />
            <div className="p-4">
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
                <ExpandableText text={description} maxLength={100} />
                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                {/* Buttons for file selection and submission */}
                {doNotRedirect && (
                    <div className="mt-4 flex space-x-2">
                        <Button onClick={() => fileInputRef.current?.click()}>
                            Choose File
                        </Button>
                        <Button onClick={handleFileSubmit}>Submit File</Button>
                    </div>
                )}
                {/* Optionally display the selected file name */}
                {selectedFile && (
                    <div className="mt-2 text-sm text-gray-600">
                        Selected File: {selectedFile.name}
                    </div>
                )}
                {/* Display response message */}
                {responseMessage && (
                    <pre className="mt-2 text-sm text-gray-700 font-sans">
                        {responseMessage}
                    </pre>
                )}
                {/* Display style violations */}
                {styleViolations && (
                    <pre className="mt-2 text-sm text-gray-700 font-mono">
                        {styleViolations}
                    </pre>
                )}
            </div>
        </div>
    );
};
