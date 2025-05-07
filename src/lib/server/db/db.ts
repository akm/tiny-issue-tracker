import { building } from '$app/environment';
import { env } from '$env/dynamic/private';

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

type dbType = ReturnType<typeof drizzle>;

export const db = await (async (): Promise<dbType> => {
	if (building) return {} as dbType;
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
	const client = await mysql.createConnection(env.DATABASE_URL);
	return drizzle(client, { schema, mode: 'default' });
})();
