ALTER TABLE `course_post_comment` RENAME COLUMN "comment" TO "content";--> statement-breakpoint
CREATE TABLE `course_post_comment_parent` (
	`child_comment_id` text NOT NULL,
	`parent_comment_id` text NOT NULL,
	PRIMARY KEY(`child_comment_id`, `parent_comment_id`),
	FOREIGN KEY (`child_comment_id`) REFERENCES `course_post_comment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_comment_id`) REFERENCES `course_post_comment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `course_post_comment` ADD `is_solution` integer NOT NULL;