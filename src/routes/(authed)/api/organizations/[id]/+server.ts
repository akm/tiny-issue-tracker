import { getOrganization } from '$lib/server/db/organization';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const id = Number(params.id);
	const organization = await getOrganization(id);
	return json(organization);
};
