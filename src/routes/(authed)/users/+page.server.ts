import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	console.log('users/+page.server.ts load function', { event });
	const items = [
		{ id: 1, name: 'Toyota', email: 'ABC' },
		{ id: 2, name: 'Ford', email: 'CDE' },
		{ id: 3, name: 'Volvo', email: 'FGH' },
		{ id: 4, name: 'Saab', email: 'IJK' }
	];
	return { items };
};
