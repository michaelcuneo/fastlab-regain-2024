import { Api } from 'sst/node/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  // Download the exercise data
  const exerciseUrl = Api.regainApi.url + '/exercise/list';
  const exerciseResponse = await fetch(exerciseUrl);

  const groupUrl = Api.regainApi.url + '/group/list';
  const groupResponse = await fetch(groupUrl);

  return {
    exerciseData: await exerciseResponse.json(),
    groupData: await groupResponse.json(),
  };
}) satisfies PageServerLoad;