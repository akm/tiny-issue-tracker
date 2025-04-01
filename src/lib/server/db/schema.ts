import { mysqlTable, int, varchar, datetime } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement(),
	googleId: varchar('google_id', { length: 255 }).notNull().unique(),
	name: varchar('name', { length: 255 }).notNull()
});

export const sessionTable = mysqlTable('sessions', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: int('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime('expires_at').notNull()
});
