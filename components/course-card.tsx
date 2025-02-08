import { cn } from "@/lib/utils";

interface Course {
    name: string;
    id: string;
}

interface CourseCardProps {
    course: Course;
    color: string;
}

export const CourseCard = ({ course, color }: CourseCardProps) => {
    return (
        <div className="border rounded hover:bg-secondary cursor-pointer">
            <div className={cn("w-full h-1 rounded-t", color)} />
            <div className="p-2">
                <p>
                    <span className="font-bold">{course.id}: </span>
                    {course.name}
                </p>
            </div>
        </div>
    );
};
