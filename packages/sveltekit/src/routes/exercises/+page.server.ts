import type { Actions, PageServerLoad } from './$types';
import { Api } from 'sst/node/api';

export const load = (async () => {
	// Fetch all exercises.
	const exerciseUrl = Api.regainApi.url + '/exercise/list';
	const exerciseResponse = await fetch(exerciseUrl);
	const exercises = await exerciseResponse.json();

	return {
		exercises: exercises
	};
}) satisfies PageServerLoad;

export const actions = {
	async getKey({ request }: { request: Request }) {
		const formData = await request.formData();
		const key = formData.get('key')?.toString();
		if (!key) {
			return { error: 'No key provided' };
		}
		const keyUrl = Api.regainApi.url + '/presignedurl/' + key;
		const keyResponse = await fetch(keyUrl);

		return keyResponse.json();
	}
} satisfies Actions;
