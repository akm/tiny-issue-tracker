import { fail } from '@sveltejs/kit';
import { getIssue } from '$lib/server/db/issue';
import { listIssueComments } from '$lib/server/db/issue_comment';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const issue = await getIssue(Number(params.id));
	if (!issue) {
		return fail(404, { error: 'Issue not found' });
	}
	const comments = await listIssueComments(issue.id, 'id', 'asc');
	return { issue, comments };
};
