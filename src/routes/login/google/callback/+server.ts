import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import { decodeIdToken } from 'arctic';

import { setSessionTokenCookie } from '$lib/server/session';
import { generateSessionToken, createSession } from '$lib/server/db/session';
import { getUserFromGoogleId, createUser } from '$lib/server/db/user';
import { google } from '$lib/server/oauth';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let claims: { sub: string; name: string; email: string };
	try {
		claims = await getClaims(code, codeVerifier);
	} catch {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	console.log('Claims:', claims);
	const googleUserId = claims.sub;
	const username = claims.name;
	const email = claims.email;

	// TODO: Replace this with your own DB query.
	const existingUser = await getUserFromGoogleId(googleUserId);

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	// TODO: Replace this with your own DB query.
	const user = await createUser(googleUserId, username, email);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}

const getClaims = async (
	code: string,
	codeVerifier: string
): Promise<{ sub: string; name: string; email: string }> => {
	if (env.GOOGLE_AUTH_DUMMY_CLAIMS) {
		const claimsJson = decodeURIComponent(code);
		return JSON.parse(claimsJson) as { sub: string; name: string; email: string };
	} else {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		return decodeIdToken(tokens.idToken()) as { sub: string; name: string; email: string };
	}
};
