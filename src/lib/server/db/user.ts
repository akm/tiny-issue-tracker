import { eq } from 'drizzle-orm';

import { users } from './schema';
import { db } from './db';
import type { InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof users>;

export async function createUser(
	googleUserId: string,
	username: string,
	email: string
): Promise<User> {
	const existingUser = await getUserFromGoogleId(googleUserId);
	if (existingUser) {
		return existingUser;
	}
	const user: User = {
		id: 0, // Assuming the ID is auto-incremented by the database
		googleId: googleUserId,
		name: username,
		email: email
	};
	const r = await db.insert(users).values(user);
	user.id = r[0].insertId;
	return user;
}

export async function getUserFromGoogleId(googleUserId: string): Promise<User | null> {
	// Check if the user already exists in the database
	const result = await db.select().from(users).where(eq(users.googleId, googleUserId)).limit(1);
	return result.length > 0 ? result[0] : null;
}
