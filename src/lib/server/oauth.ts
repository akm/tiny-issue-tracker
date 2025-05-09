import { Google } from 'arctic';
import { env } from '$env/dynamic/private';

export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	`${env.GOOGLE_AUTH_CALLBACK_ORIGIN}/login/google/callback`
);
