import { fail } from '@sveltejs/kit';
import {
	listOrganizations,
	createOrganization,
	updateOrganization,
	deleteOrganizations
} from '$lib/server/db/organization';
import { assertUnion } from '$lib/union';
import type { PageServerLoad } from './$types';

const columnNames = ['id', 'name'] as const;

const orderDirections = ['asc', 'desc'] as const;

export const load: PageServerLoad = async ({ url }) => {
	// console.log('users/+page.server.ts load function', { url });
	const orderBy = assertUnion(url.searchParams.get('orderBy'), columnNames);
	const orderDirection = assertUnion(url.searchParams.get('orderDirection'), orderDirections);
	const items = await listOrganizations(orderBy, orderDirection);

	console.log('ordered:', { items, orderBy, orderDirection });
	return { items, orderBy, orderDirection };
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		console.log('create action', { formData });
		const name = formData.get('name')?.toString() ?? '';
		if (name === '') {
			return fail(400, { error: 'Name is required' });
		}
		await createOrganization(name);
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		console.log('update action', { formData });
		const id = Number(formData.get('id'));
		if (!id) {
			return fail(400, { error: 'ID is required' });
		}
		const name = formData.get('name')?.toString() ?? '';
		if (name === '') {
			return fail(400, { error: 'Name is required' });
		}
		await updateOrganization(id, name);
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
		await deleteOrganizations(...ids);
	}
};
