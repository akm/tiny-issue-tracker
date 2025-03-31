import { setSessionTokenCookie, deleteSessionTokenCookie } from './lib/server/session';
import { validateSessionToken } from './lib/server/db/session';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// console.log('Handling request:', event.request.method, event.request.url);
	const token = event.cookies.get('session') ?? null;
	// console.log('Handling request with token:', token);
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	// console.log('Handling request event', { event });
	return resolve(event);
};
