import mysql from 'mysql2/promise';
import { mysqlTable, int, varchar, datetime } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';

import type { InferSelectModel } from 'drizzle-orm';

const connection = await mysql.createConnection();
const db = drizzle(connection);

export const userTable = mysqlTable('user', {
	id: int('id').primaryKey().autoincrement()
});

export const sessionTable = mysqlTable('session', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: int('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime('expires_at').notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
