import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	// console.log('Loading layout for authed route', { event });
	if (!event.locals || !event.locals.user) {
		return redirect(303, '/login');
	}

	try {
		const response = await event.fetch('/api');
		return await response.json();
	} catch (error) {
		console.error(`Error in load function for : ${error}`);
	}
};
