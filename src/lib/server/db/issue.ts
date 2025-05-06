import { eq, inArray, desc, asc } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

import { issues } from './schema';
import { createIssueComment } from './issue_comment';
import { db } from './db';

export type Issue = InferSelectModel<typeof issues>;

export const createIssue = async (
	organizationId: number,
	title: string,
	userId: number
): Promise<Issue> => {
	const issue: Issue = {
		id: 0, // Assuming the ID is auto-incremented by the database
		title: title,
		createdAt: new Date(),
		updatedAt: new Date(),
		organizationId: organizationId,
		status: 'open'
	};
	const r = await db.insert(issues).values(issue);
	issue.id = r[0].insertId;
	await createIssueComment(issue.id, userId, 'Issue created');
	return issue;
};

export const updateIssueTitle = async (id: number, title: string): Promise<void> => {
	await db.update(issues).set({ title: title, updatedAt: new Date() }).where(eq(issues.id, id));
};

export const updateIssueStatus = async (id: number, status: 'open' | 'closed'): Promise<void> => {
	await db.update(issues).set({ status: status, updatedAt: new Date() }).where(eq(issues.id, id));
};

export const deleteIssue = async (id: number): Promise<void> => {
	await db.delete(issues).where(eq(issues.id, id));
};

export const deleteIssues = async (...ids: number[]): Promise<void> => {
	await db.delete(issues).where(inArray(issues.id, ids));
};

export const getIssue = async (id: number): Promise<Issue | undefined> => {
	return await db.query.issues.findFirst({ where: eq(issues.id, id) });
};

export const listIssues = async (
	orderBy: 'id' | 'title' | 'createdAt' | 'updatedAt',
	orderDirection: 'asc' | 'desc',
	options?: {
		limit?: number;
		offset?: number;
		ids?: number[];
	}
): Promise<Issue[]> => {
	const orderByCol =
		orderBy === 'id'
			? issues.id
			: orderBy === 'title'
				? issues.title
				: orderBy === 'createdAt'
					? issues.createdAt
					: issues.updatedAt;
	const direction = orderDirection === 'asc' ? asc : desc;
	const limit = options?.limit ?? 100;
	const offset = options?.offset ?? 0;
	return await db.query.issues.findMany({
		where: options?.ids ? inArray(issues.id, options.ids) : undefined,
		orderBy: direction(orderByCol),
		limit: limit,
		offset: offset
	});
};
