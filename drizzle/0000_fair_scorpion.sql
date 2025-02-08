CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE TABLE `course` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`description` text NOT NULL,
	`files_enabled` integer NOT NULL,
	`forum_enabled` integer NOT NULL,
	`assignments_enabled` integer NOT NULL,
	`people_enabled` integer NOT NULL,
	`schedule_enabled` integer NOT NULL,
	`archived` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
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
	`content` text NOT NULL,
	`is_anonymous` integer NOT NULL,
	`is_solution` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_post_id`) REFERENCES `course_post`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `course_post_comment_parent` (
	`child_comment_id` text NOT NULL,
	`parent_comment_id` text NOT NULL,
	PRIMARY KEY(`child_comment_id`, `parent_comment_id`),
	FOREIGN KEY (`child_comment_id`) REFERENCES `course_post_comment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_comment_id`) REFERENCES `course_post_comment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `course_user` (
	`course_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text NOT NULL,
	PRIMARY KEY(`course_id`, `user_id`),
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action,
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
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
