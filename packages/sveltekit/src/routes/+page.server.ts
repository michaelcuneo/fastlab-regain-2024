import { Api } from 'sst/node/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  // Download the exercise data
  const exerciseUrl = Api.regainApi.url + '/exercise/list';
  const exerciseResponse = await fetch(exerciseUrl);

  return {
    exerciseData: await exerciseResponse.json(),
  };
}) satisfies PageServerLoad;