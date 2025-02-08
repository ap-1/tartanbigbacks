import {
    sqliteTable,
    text,
    integer,
    primaryKey,
} from "drizzle-orm/sqlite-core";

export const course = sqliteTable("course", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    description: text("description"),
    filesEnabled: integer("files_enabled", { mode: "boolean" }).notNull(),
    forumEnabled: integer("forum_enabled", { mode: "boolean" }).notNull(),
    assignmentsEnabled: integer("assignments_enabled", {
        mode: "boolean",
    }).notNull(),
    peopleEnabled: integer("people_enabled", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const postTopic = sqliteTable("post_topic", {
    id: text("id").primaryKey(),
    courseId: text("course_id")
        .notNull()
        .references(() => course.id),
    topic: text("topic").notNull(),
});

export const coursePost = sqliteTable("course_post", {
    id: text("id").primaryKey(),
    courseId: text("course_id")
        .notNull()
        .references(() => course.id),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    title: text("title").notNull(),
    topic: text("topic")
        .notNull()
        .references(() => postTopic.id),
    description: text("description").notNull(),
    isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull(),
    pinned: integer("pinned", { mode: "boolean" }).notNull(),
    postType: text("post_type").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const coursePostComment = sqliteTable("course_post_comment", {
    id: text("id").primaryKey(),
    coursePostId: text("course_post_id")
        .notNull()
        .references(() => coursePost.id),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    content: text("content").notNull(),
    isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull(),
    isSolution: integer("is_solution", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const coursePostCommentParent = sqliteTable(
    "course_post_comment_parent",
    {
        childCommentId: text("child_comment_id")
            .notNull()
            .references(() => coursePostComment.id),
        parentCommentId: text("parent_comment_id")
            .notNull()
            .references(() => coursePostComment.id),
    },
    (t) => [primaryKey({ columns: [t.childCommentId, t.parentCommentId] })]
);

export const courseUser = sqliteTable(
    "course_user",
    {
        courseId: text("course_id")
            .notNull()
            .references(() => course.id),
        userId: text("user_id")
            .notNull()
            .references(() => user.id),
        role: text("role").notNull(),
    },
    (t) => [primaryKey({ columns: [t.courseId, t.userId] })]
);

export const assignment = sqliteTable("assignment", {
    id: text("id").primaryKey(),
    courseId: text("course_id")
        .notNull()
        .references(() => course.id),
    professorId: text("professor_id")
        .notNull()
        .references(() => user.id),
    name: text("name").notNull(),
    description: text("description").notNull(),
    dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const assignmentStudent = sqliteTable(
    "assignment_student",
    {
        assignmentId: text("assignment_id")
            .notNull()
            .references(() => assignment.id),
        studentId: text("student_id")
            .notNull()
            .references(() => user.id),
        submittedAt: integer("submitted_at", { mode: "timestamp" }),
        score: integer("score"),
    },
    (t) => [primaryKey({ columns: [t.assignmentId, t.studentId] })]
);

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
});

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
        mode: "timestamp",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
        mode: "timestamp",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
});
