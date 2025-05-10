import { fail } from '@sveltejs/kit';
import { listIssues, createIssue, deleteIssues } from '$lib/server/db/issue';
import { assertUnion } from '$lib/union';
import type { PageServerLoad } from './$types';

const columnNames = ['id', 'title', 'createdAt', 'updatedAt'] as const;

const orderDirections = ['asc', 'desc'] as const;

export const load: PageServerLoad = async ({ url }) => {
	// console.log('users/+page.server.ts load function', { url });
	const orderBy = assertUnion(url.searchParams.get('orderBy'), columnNames);
	const orderDirection = assertUnion(url.searchParams.get('orderDirection'), orderDirections);
	const items = await listIssues(orderBy, orderDirection);

	console.log('ordered:', { items, orderBy, orderDirection });
	return { items, orderBy, orderDirection };
};

export const actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		console.log('create action', { formData });
		const organizationIDStr = formData.get('organization_id')?.toString() ?? '';
		if (organizationIDStr === '') {
			return fail(400, { error: 'Organization ID is required' });
		}
		const organizationID = Number(organizationIDStr);
		const title = formData.get('title')?.toString() ?? '';
		if (title === '') {
			return fail(400, { error: 'Title is required' });
		}
		const headerComment = formData.get('header_comment')?.toString() ?? '';
		if (headerComment === '') {
			return fail(400, { error: 'Header Comment is required' });
		}
		await createIssue(organizationID, title, locals.user.id, headerComment);
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		console.log('delete action', { formData });
		const commaSeparatedIDs = formData.get('ids');
		if (!commaSeparatedIDs) {
			return fail(400, { error: 'IDs are required' });
		}
		const ids = commaSeparatedIDs.toString().split(',').map(Number);
		if (ids.length === 0) {
			return fail(400, { error: 'IDs are required' });
		}
		console.log('delete action', { ids });
		await deleteIssues(...ids);
	}
};
