CREATE TABLE `issue_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`issue_id` int NOT NULL,
	`user_id` int NOT NULL,
	`content` mediumtext NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `issue_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `issues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`organization_id` int NOT NULL,
	`status` enum('open','closed') NOT NULL DEFAULT 'open',
	CONSTRAINT `issues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `issue_comments` ADD CONSTRAINT `issue_comments_issue_id_issues_id_fk` FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `issue_comments` ADD CONSTRAINT `issue_comments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `issues` ADD CONSTRAINT `issues_organization_id_organizations_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE cascade ON UPDATE no action;