"use client";

import type { PagesResponse } from "@/app/api/pages/route";
import {
    Assignment,
    type AssignmentProps,
    type Assignments,
} from "@/components/assignment";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PageProps {
    name: string;
    courseID: string;
}

const Page = ({ name, courseID }: PageProps) => {
    return (
        <Link
            href={`/course/${courseID}/${name.toLowerCase()}`}
            className="text-xl duration-300 hover:bg-secondary hover:border-black hover:dark:border-white rounded transition-all my-2 pl-4 py-2 border-l-8"
        >
            {name}
        </Link>
    );
};

export const AppSidebarContent = () => {
    const params = useParams();

    const { courseID } = params;
    const { data } = authClient.useSession();

    const [assignments, setAssigments] = useState<Assignments>([]);
    const [pages, setPages] = useState<PagesResponse>();
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

    useEffect(() => {
        if (courseID && data) {
            setLoading(true);
            fetch(
                `/api/assignments?courseID=${courseID}&userID=${data.user.id}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setPages(data);
                    setLoading(false);
                })
                .catch((err) => {
                    toast.error("Failed to fetch assignments", err);
                    console.error(err);

                    setLoading(false);
                });
        }
    }, [data, courseID]);

    if (!loading && !courseID) {
        return (
            <div>
                <h1 className="font-bold text-2xl">Todo</h1>
                <div className="flex flex-col">
                    {!data || assignments.length === 0 ? (
                        <p>No assignments—you're all caught up!</p>
                    ) : (
                        assignments.map((assignment: AssignmentProps) => (
                            <Assignment key={assignment.id} {...assignment} />
                        ))
                    )}
                </div>
            </div>
        );
    }

    if (!courseID || typeof courseID !== "string") {
        return <p>Invalid course ID specified!</p>;
    }

    if (loading || !pages) {
        return (
            <div>
                <h1 className="font-bold text-2xl">Pages</h1>
                <p>No pages available for this course!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {pages.assignmentsEnabled ?? (
                <Page name="Assignments" courseID={courseID} />
            )}
            {pages.peopleEnabled ?? <Page name="People" courseID={courseID} />}
            {pages.forumEnabled ?? <Page name="Forum" courseID={courseID} />}
            {pages.filesEnabled ?? <Page name="Files" courseID={courseID} />}
            {pages.scheduleEnabled ?? (
                <Page name="Schedule" courseID={courseID} />
            )}
        </div>
    );
};
