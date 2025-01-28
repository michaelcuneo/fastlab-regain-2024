import type { Actions, PageServerLoad } from './$types';
import { Api } from 'sst/node/api';

export const load: PageServerLoad = (async ({ params }) => {
	// Fetch all exercises.
	const exerciseUrl = Api.regainApi.url + '/exercise/get/' + params.slug;
	const exerciseResponse = await fetch(exerciseUrl);
	const exercise = await exerciseResponse.json();

	const videoUrl = Api.regainApi.url + '/presignedurl/' + exercise.videoKey;
	const videoResponse = await fetch(videoUrl);
	const video = await videoResponse.json();
	exercise.video = video.url;

	return {
		exercises: exercise
	};
}) satisfies PageServerLoad;

export const actions = {
	async getKey({ request }: { request: Request }) {
		const formData = await request.formData();
		const key = formData.get('key')?.toString();
		const keyUrl = Api.regainApi.url + '/presignedurl/' + key;
		const keyResponse = await fetch(keyUrl);

		return keyResponse.json();
	}
} satisfies Actions;
