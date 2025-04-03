import type { PageServerLoad } from './$types';

const items = [
	{ id: 1, name: 'Toyota', email: 'ABC' },
	{ id: 2, name: 'Ford', email: 'CDE' },
	{ id: 3, name: 'Volvo', email: 'FGH' },
	{ id: 4, name: 'Saab', email: 'IJK' }
];

export const load: PageServerLoad = async ({ url }) => {
	console.log('users/+page.server.ts load function', { url });
	const order = url.searchParams.get('order');
	switch (url.searchParams.get('sort')) {
		case 'id':
			console.log('Sorting by id');
			items.sort((a, b) => (order === 'desc' ? b.id - a.id : a.id - b.id));
			break;
		case 'name':
			console.log('Sorting by name');
			items.sort((a, b) =>
				order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
			);
			break;
		case 'email':
			console.log('Sorting by email');
			items.sort((a, b) =>
				order === 'desc' ? b.email.localeCompare(a.email) : a.email.localeCompare(b.email)
			);
	}
	console.log('Sorted items:', items);
	return { items };
};
