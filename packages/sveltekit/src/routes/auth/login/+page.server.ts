import type { Actions } from './$types';
import { Api } from 'sst/node/api';

export const actions = {
	async magicLinks({ request }: { request: Request }) {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const getUserURL = `${Api.regainApi.url}/user/getUserByEmail/${email}`;
		const userResponse = await fetch(getUserURL);

		if (!userResponse.ok) {
			return {
				success: false,
				error: 'Failed to fetch user, this error has been logged with FASTlab.'
			};
		} else {
			// Parse the response to JSON
			const user = await userResponse.json();

			// If user does not exist, create the user.
			if (user === "User doesn't exist") {
				const userCreateURL = `${Api.regainApi.url}/user/create`;

				const createUserData = await fetch(userCreateURL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(email)
				});

				if (!createUserData.ok) {
					return {
						success: false,
						error: 'Failed to create user, this error has been logged with FASTlab.'
					};
				}
			} else {
				// Send a POST request to the magic link endpoint
				const userAuthURL = `${Api.regainApi.url}/auth/magicLink/authorize?email=${email}`;
				const magicLinkResponse = await fetch(
					userAuthURL,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' }
					}
				);

				if (!magicLinkResponse.ok) {
					return {
						success: false,
						error: 'Failed to send magic link, this error has been logged with FASTlab.'
					}
				}
			}
		}

		// Return a success response
		return { success: true, error: null };
	}
} satisfies Actions;
