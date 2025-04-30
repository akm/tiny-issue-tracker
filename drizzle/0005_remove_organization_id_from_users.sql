ALTER TABLE `users` DROP FOREIGN KEY `users_organization_id_organizations_id_fk`;
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `organization_id`;