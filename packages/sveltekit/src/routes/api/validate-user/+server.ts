import { validateSession } from '$lib/utils/auth';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants';
import { json } from '@sveltejs/kit';
import { Api } from 'sst/node/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookieName = SESSION_COOKIE_NAME;
	const sessionCookie = cookies.get(sessionCookieName);
	const url = Api.regainApi.url;

	// Flag to indicate if the user is authenticated.
	let isAuthenticated = false;
	let isUser = undefined;

	// Check if the session cookie is present.
	if (sessionCookie) {
		try {
			// Validate the session cookie.
			const session = validateSession(sessionCookie);
			// Set the authenticated flag based on the validity of the session.
			isAuthenticated = Boolean(session.session);

			// If the session is valid, set the user ID in the locals.
			if (isAuthenticated) {
				isUser = await fetch(url + '/session/get/' + session.session.userId).then(
					(res) => res.json()
				);
			}
		} catch {
			// If the session cookie is invalid, delete the cookie.
			cookies.delete(sessionCookieName, { path: '/' });
		}
	}

	// Return a JSON response indicating if the user is authenticated.
	return json({ authenticated: isAuthenticated, user: isUser });
};
