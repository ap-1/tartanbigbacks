import { db } from "@/db";
import {
    assignment,
    assignmentStudent,
    course,
    courseUser,
    user,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";

export type Assignment = typeof assignment.$inferInsert;
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

export async function addUserToCourse(
    userID: User["id"],
    courseID: Course["id"],
    role: "student" | "professor" | "ta"
) {
    await db.insert(courseUser).values({
        userId: userID,
        courseId: courseID,
        role,
    });
}

export async function getPeopleInCourse(courseID: Course["id"]) {
    return await db
        .select({
            id: user.id,
            name: user.name,
            email: user.email,
            role: courseUser.role,
        })
        .from(courseUser)
        .innerJoin(user, eq(courseUser.userId, user.id))
        .where(eq(courseUser.courseId, courseID))
        .all();
}

export async function createAssignmentForAllUsersInCourse(
    newAssignment: Omit<Assignment, "createdAt" | "updatedAt">
) {
    const now = new Date();
    await db.insert(assignment).values({
        ...newAssignment,
        createdAt: now,
        updatedAt: now,
    });

    const assignmentId = newAssignment.id;

    const students = await db
        .select()
        .from(courseUser)
        .where(
            and(
                eq(courseUser.courseId, newAssignment.courseId),
                eq(courseUser.role, "student")
            )
        )
        .all();

    for (const student of students) {
        await db
            .insert(assignmentStudent)
            .values({
                assignmentId,
                studentId: student.userId,
            })
            .run();
    }
}

export async function addUserToAssignment(
    userID: User["id"],
    assignmentID: Assignment["id"]
) {
    await db.insert(assignmentStudent).values({
        studentId: userID,
        assignmentId: assignmentID,
    });
}

export async function getUserAssignments(userID: string) {
    return await db
        .select({
            id: assignment.id,
            name: assignment.name,
            description: assignment.description,
            courseId: assignment.courseId,
            professorId: assignment.professorId,
            dueDate: assignment.dueDate,
        })
        .from(assignment)
        .innerJoin(
            assignmentStudent,
            eq(assignmentStudent.assignmentId, assignment.id)
        )
        .where(eq(assignmentStudent.studentId, userID))
        .all();
}

export async function getUserAssignmentsForCourse(
    userID: string,
    courseID: string
) {
    return await db
        .select({
            id: assignment.id,
            name: assignment.name,
            description: assignment.description,
            courseId: assignment.courseId,
            professorId: assignment.professorId,
            dueDate: assignment.dueDate,
        })
        .from(assignment)
        .innerJoin(
            assignmentStudent,
            eq(assignmentStudent.assignmentId, assignment.id)
        )
        .where(
            and(
                eq(assignmentStudent.studentId, userID),
                eq(assignment.courseId, courseID)
            )
        )
        .all();
}
