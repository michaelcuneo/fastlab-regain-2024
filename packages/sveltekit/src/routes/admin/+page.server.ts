import type { Actions } from './$types';
import { Api } from 'sst/node/api';

export const actions = {
	async getKey({ request }: { request: Request }) {
		const formData = await request.formData();
		const key = formData.get('key')?.toString() || undefined;
		const keyUrl = Api.regainApi.url + '/presignedurl/' + key;
		const keyResponse = await fetch(keyUrl);

		return keyResponse.json();
	}
} satisfies Actions;
