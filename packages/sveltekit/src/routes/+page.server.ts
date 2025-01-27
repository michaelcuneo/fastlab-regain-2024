import { Api } from 'sst/node/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  // Download the exercise data
  const groupExerciseUrl = Api.regainApi.url + '/groupExercise/list';
  const groupExerciseResponse = await fetch(groupExerciseUrl);

  const groupExercises = await groupExerciseResponse.json();

  return {
    groupExerciseData: groupExercises,
  };
}) satisfies PageServerLoad;