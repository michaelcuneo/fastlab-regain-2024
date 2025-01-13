import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		authenticated: locals.session !== undefined,
		user: locals.user !== undefined
	};
}) satisfies LayoutServerLoad;
