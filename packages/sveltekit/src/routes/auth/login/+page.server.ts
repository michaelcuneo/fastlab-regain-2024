import type { Actions } from './$types';
import { Api } from 'sst/node/api';

export const actions = {
	async magicLinks({ request }: { request: Request }) {
		// Extract the form data from the request
		const formData = await request.formData();
		// Get the email from the form data
		const email = formData.get('email')?.toString();
		const getUserURL = `${Api.api.url}/user/getUserByEmail/${email}`;

		console.log(getUserURL);

		// Fetch the user using the email
		const userResponse = await fetch(getUserURL);

		if (!userResponse.ok) {
			return {
				success: false,
				error: 'Failed to fetch user, this error has been logged with FASTlab.'
			};
		} else {
			// Parse the response to JSON
			const user = await userResponse.json();
			const userCreateURL = `${Api.api.url}/user/create`;

			// If user does not exist, return an error response
			if (user === "User doesn't exist") {
				const createUserData = await fetch(userCreateURL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email })
				});

				if (!createUserData.ok) {
					return {
						success: false,
						error: 'Failed to create user, this error has been logged with FASTlab.'
					};
				}
			}
		}

		/*
		// Send a POST request to the magic link endpoint
		const magicLinkResponse = await fetch(
			`${Api.api.url}/auth/magicLink/authorize?email=${email}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			}
		);

		// If the request was not successful, return an error response
		if (!magicLinkResponse.ok) {
			return { success: false, error: 'Failed to send magic link' };
		}

		// Return a success response
		return { success: true, error: null };
		*/
	}
} satisfies Actions;
