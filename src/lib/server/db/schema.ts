import { sql } from 'drizzle-orm';
import { mysqlTable, int, varchar, datetime } from 'drizzle-orm/mysql-core';

export const organizations = mysqlTable('organizations', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: datetime('created_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: datetime('updated_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const users = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement(),
	googleId: varchar('google_id', { length: 255 }).notNull().unique(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull()
});

export const sessions = mysqlTable('sessions', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: int('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: datetime('expires_at').notNull()
});
