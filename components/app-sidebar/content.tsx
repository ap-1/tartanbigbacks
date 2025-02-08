"use client";

import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Assignment,
    type Assignments,
    type AssignmentProps,
} from "@/components/assignment";

export const AppSidebarContent = () => {
    const params = useParams();

    const { courseID } = params;
    const { data } = authClient.useSession();

    const [assignments, setAssigments] = useState<Assignments>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data) {
            setLoading(true);
            fetch(`/api/assignments?userID=${data.user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setAssigments(data);
                    setLoading(false);
                })
                .catch((err) => {
                    toast.error("Failed to fetch assignments", err);
                    console.error(err);

                    setLoading(false);
                });
        }
    }, [data]);

    if (!loading && !courseID) {
        return (
            <div>
                <h1 className="font-bold text-lg">Todo</h1>
                <div className="flex flex-col">
                    {!data || assignments.length === 0 ? (
                        <p>No assignments—you're all caught up!</p>
                    ) : (
                        assignments.map((assignment: AssignmentProps) => (
                            <Assignment key={assignment.name} {...assignment} />
                        ))
                    )}
                </div>
            </div>
        );
    }

    if (!courseID || typeof courseID !== "string") {
        return <p>Invalid course ID specified!</p>;
    }

    return (
        <div>
            <p>pages for this class go here</p>
        </div>
    );
};
