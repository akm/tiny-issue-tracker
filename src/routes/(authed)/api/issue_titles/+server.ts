import { listIssues } from '$lib/server/db/issue';
import { json } from '@sveltejs/kit';
import { assertUnion } from '$lib/union';

const columnNames = ['id', 'title', 'createdAt', 'updatedAt'] as const;
const orderDirections = ['asc', 'desc'] as const;

export const GET = async ({ url }) => {
	const orderBy = assertUnion(url.searchParams.get('orderBy'), columnNames);
	const orderDirection = assertUnion(url.searchParams.get('orderDirection'), orderDirections);
	const limit = Math.min(100, Number(url.searchParams.get('limit'))) || 100;
	const offset = Number(url.searchParams.get('offset')) || 0;
	const ids = url.searchParams.get('ids')?.split(',').map(Number);

	const organization = await listIssues(orderBy, orderDirection, {
		limit,
		offset,
		ids
	});
	return json(organization);
};
