import { listUsers } from '$lib/server/db/user';
import { assertUnion } from '$lib/union';
import type { PageServerLoad } from './$types';

const columnNames = ['id', 'name', 'email'] as const;
type ColumnName = (typeof columnNames)[number];

const orderDirections = ['asc', 'desc'] as const;
type OrderDirection = (typeof orderDirections)[number];

export const load: PageServerLoad = async ({ url }) => {
	// console.log('users/+page.server.ts load function', { url });
	const orderBy = assertUnion<ColumnName>(url.searchParams.get('orderBy'), columnNames);
	const orderDirection = assertUnion<OrderDirection>(
		url.searchParams.get('orderDirection'),
		orderDirections
	);
	const items = await listUsers(orderBy, orderDirection);

	console.log('ordered:', { items, orderBy, orderDirection });
	return { items, orderBy, orderDirection };
};
