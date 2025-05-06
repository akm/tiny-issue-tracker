import { fail } from '@sveltejs/kit';
import { getIssue, updateIssueStatus, updateIssueTitle } from '$lib/server/db/issue';
import {
	listIssueComments,
	createIssueComment,
	updateIssueComment,
	deleteIssueComment
} from '$lib/server/db/issue_comment';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const issue = await getIssue(Number(params.id));
	if (!issue) {
		return fail(404, { error: 'Issue not found' });
	}
	const comments = await listIssueComments(issue.id, 'id', 'asc');
	return { issue, comments };
};

export const actions = {
	close: async ({ request }) => {
		const formData = await request.formData();
		console.log('close action', { formData });
		const idStr = formData.get('id')?.toString() ?? '';
		if (idStr === '') {
			return fail(400, { error: 'ID is required' });
		}
		const id = Number(idStr);
		await updateIssueStatus(id, 'closed');
	},
	open: async ({ request }) => {
		const formData = await request.formData();
		console.log('openm action', { formData });
		const idStr = formData.get('id')?.toString() ?? '';
		if (idStr === '') {
			return fail(400, { error: 'ID is required' });
		}
		const id = Number(idStr);
		await updateIssueStatus(id, 'open');
	},

	update_title: async ({ request }) => {
		const formData = await request.formData();
		console.log('update_title action', { formData });
		const idStr = formData.get('id')?.toString() ?? '';
		if (idStr === '') {
			return fail(400, { error: 'ID is required' });
		}
		const id = Number(idStr);
		const title = formData.get('title')?.toString() ?? '';
		if (title === '') {
			return fail(400, { error: 'Title is required' });
		}
		await updateIssueTitle(id, title);
	},

	add_comment: async ({ request, locals }) => {
		const formData = await request.formData();
		console.log('add_comment action', { formData });
		const issueIdStr = formData.get('issue_id')?.toString() ?? '';
		if (issueIdStr === '') {
			return fail(400, { error: 'Issue ID is required' });
		}
		const issueId = Number(issueIdStr);
		const content = formData.get('content')?.toString() ?? '';
		if (content === '') {
			return fail(400, { error: 'Content is required' });
		}
		await createIssueComment(issueId, locals.user.id, content);
	},

	update_comment: async ({ request }) => {
		const formData = await request.formData();
		console.log('update_comment action', { formData });
		const idStr = formData.get('id')?.toString() ?? '';
		if (idStr === '') {
			return fail(400, { error: 'ID is required' });
		}
		const id = Number(idStr);
		const content = formData.get('content')?.toString() ?? '';
		if (content === '') {
			return fail(400, { error: 'Content is required' });
		}
		await updateIssueComment(id, content);
	},

	delete_comment: async ({ request }) => {
		const formData = await request.formData();
		console.log('update_comment action', { formData });
		const idStr = formData.get('id')?.toString() ?? '';
		if (idStr === '') {
			return fail(400, { error: 'ID is required' });
		}
		const id = Number(idStr);
		await deleteIssueComment(id);
	}
};
