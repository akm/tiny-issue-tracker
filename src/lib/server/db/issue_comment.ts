import { eq, inArray, desc, asc } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

import { issue_comments } from './schema';
import { db } from './db';

export type IssueComment = InferSelectModel<typeof issue_comments>;

export async function createIssueComment(
	issueId: number,
	userId: number,
	comment: string
): Promise<IssueComment> {
	const issueComment: IssueComment = {
		id: 0, // Assuming the ID is auto-incremented by the database
		issueId: issueId,
		userId: userId,
		comment: comment,
		createdAt: new Date(),
		updatedAt: new Date()
	};
	const r = await db.insert(issue_comments).values(issueComment);
	issueComment.id = r[0].insertId;
	return issueComment;
}

export const updateIssueComment = async (id: number, comment: string): Promise<void> => {
	await db
		.update(issue_comments)
		.set({
			comment: comment,
			updatedAt: new Date()
		})
		.where(eq(issue_comments.id, id));
};

export const deleteIssueComment = async (id: number): Promise<void> => {
	await db.delete(issue_comments).where(eq(issue_comments.id, id));
};

export const getIssueComment = async (id: number): Promise<IssueComment | undefined> => {
	return await db.query.issue_comments.findFirst({ where: eq(issue_comments.id, id) });
};

export const listIssueComments = async (
	issueId: number,
	orderBy: 'id' | 'createdAt' | 'updatedAt',
	orderDirection: 'asc' | 'desc',
	options?: {
		limit?: number;
		offset?: number;
	}
): Promise<IssueComment[]> => {
	const orderByCol =
		orderBy === 'id'
			? issue_comments.id
			: orderBy === 'createdAt'
				? issue_comments.createdAt
				: issue_comments.updatedAt;
	const direction = orderDirection === 'asc' ? asc : desc;
	const limit = options?.limit ?? 100;
	const offset = options?.offset ?? 0;
	return await db.query.issue_comments.findMany({
		where: eq(issue_comments.issueId, issueId),
		orderBy: direction(orderByCol),
		limit: limit,
		offset: offset
	});
};
