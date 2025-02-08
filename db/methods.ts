import { course, courseUser, type user } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export type Course = typeof course.$inferInsert;
export type User = typeof user.$inferInsert;

export async function createCourse(
    newCourse: Omit<Course, "createdAt" | "updatedAt">,
    creator: User["id"]
) {
    const now = new Date();
    await db.insert(course).values({
        ...newCourse,
        createdAt: now,
        updatedAt: now,
    });

    await db.insert(courseUser).values({
        courseId: newCourse.id,
        userId: creator,
        role: "professor",
    });
}

export async function getCourse(courseID: Course["id"]) {
    return await db.select().from(course).where(eq(course.id, courseID)).get();
}

export async function getUserCourses(userID: User["id"]) {
    return await db
        .select({ course, role: courseUser.role })
        .from(courseUser)
        .innerJoin(course, eq(courseUser.courseId, course.id))
        .where(eq(courseUser.userId, userID))
        .all();
}
