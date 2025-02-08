CREATE TABLE `assignment` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`professor_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`due_date` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`professor_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `assignment_student` (
	`assignment_id` text NOT NULL,
	`student_id` text NOT NULL,
	`submitted_at` integer,
	`score` integer,
	PRIMARY KEY(`assignment_id`, `student_id`),
	FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `course_post` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`topic` text NOT NULL,
	`description` text NOT NULL,
	`is_anonymous` integer NOT NULL,
	`pinned` integer NOT NULL,
	`post_type` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic`) REFERENCES `post_topic`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `course_post_comment` (
	`id` text PRIMARY KEY NOT NULL,
	`course_post_id` text NOT NULL,
	`user_id` text NOT NULL,
	`comment` text NOT NULL,
	`is_anonymous` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_post_id`) REFERENCES `course_post`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `post_topic` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`topic` text NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `course` ADD `files_enabled` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `course` ADD `forum_enabled` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `course` ADD `assignments_enabled` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `course` ADD `people_enabled` integer NOT NULL;