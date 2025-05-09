import { eq, inArray, desc, asc } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

import { organizations, users } from './schema';
import { db } from './db';

export type Organization = InferSelectModel<typeof organizations>;

export async function createOrganization(name: string): Promise<Organization> {
	const organization: Organization = {
		id: 0, // Assuming the ID is auto-incremented by the database
		name: name,
		createdAt: new Date(),
		updatedAt: new Date()
	};
	const r = await db.insert(organizations).values(organization);
	organization.id = r[0].insertId;
	return organization;
}

export async function updateOrganization(id: number, name: string): Promise<void> {
	await db
		.update(organizations)
		.set({
			name: name,
			updatedAt: new Date()
		})
		.where(eq(organizations.id, id));
}

export async function deleteOrganization(id: number): Promise<void> {
	await db.delete(organizations).where(eq(organizations.id, id));
}

export async function deleteOrganizations(...ids: number[]): Promise<void> {
	await db.delete(organizations).where(inArray(organizations.id, ids));
}

export async function getOrganization(id: number): Promise<Organization | undefined> {
	return await db.query.organizations.findFirst({ where: eq(organizations.id, id) });
}

export async function listOrganizations(
	orderBy: 'id' | 'name',
	orderDirection: 'asc' | 'desc',
	options?: {
		limit?: number;
		offset?: number;
		ids?: number[];
	}
): Promise<Organization[]> {
	const orderByCol = orderBy === 'id' ? users.id : orderBy === 'name' ? users.name : users.email;
	const direction = orderDirection === 'asc' ? asc : desc;
	const limit = options?.limit ?? 100;
	const offset = options?.offset ?? 0;
	return await db.query.organizations.findMany({
		where: options?.ids ? inArray(organizations.id, options.ids) : undefined,
		orderBy: direction(orderByCol),
		limit: limit,
		offset: offset
	});
}
