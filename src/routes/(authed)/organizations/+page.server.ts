import {
	listOrganizations,
	createOrganization,
	updateOrganization,
	deleteOrganization
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
		const name = formData.get('name')?.toString() ?? '';
		if (name === '') {
			return { error: 'Name is required' };
		}
		await createOrganization(name);
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const name = formData.get('name')?.toString() ?? '';
		if (name === '') {
			return { error: 'Name is required' };
		}
		await updateOrganization(id, name);
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		await deleteOrganization(id);
	}
};
