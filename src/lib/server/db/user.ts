import { eq } from 'drizzle-orm';

import type { User } from './schema';
import { userTable } from './schema';
import { db } from './index';

export async function createUser(googleUserId: string, username: string): Promise<User> {
	const existingUser = await getUserFromGoogleId(googleUserId);
	if (existingUser) {
		return existingUser;
	}
	const user: User = {
		id: 0, // Assuming the ID is auto-incremented by the database
		googleId: googleUserId,
		name: username
	};
	const r = await db.insert(userTable).values(user);
	user.id = r[0].insertId;
	return user;
}

export async function getUserFromGoogleId(googleUserId: string): Promise<User | null> {
	// Check if the user already exists in the database
	const result = await db
		.select()
		.from(userTable)
		.where(eq(userTable.googleId, googleUserId))
		.limit(1);
	return result.length > 0 ? result[0] : null;
}
