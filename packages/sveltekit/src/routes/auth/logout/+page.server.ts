import { signOut } from '$lib/utils/auth.js';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants.js';

export const actions = {
	default: async ({ cookies }) => {
		// Retrieve the session ID from the cookies
		const sessionId = cookies.get(SESSION_COOKIE_NAME);

		// If no session ID exists, return an empty object
		if (!sessionId) return {};

		try {
			// Attempt to sign out the user using the session ID
			signOut(sessionId);

			// Delete the session cookie
			cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		} catch {
			// If an error occurs, return an object with a message
			return { message: 'Failed to sign out' };
		}

		// Return an empty object if successful
		return {};
	}
};
