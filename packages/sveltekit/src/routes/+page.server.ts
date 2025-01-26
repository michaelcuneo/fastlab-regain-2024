import { Api } from 'sst/node/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  // Download the exercise data
  const exerciseUrl = Api.regainApi.url + '/exercise/list';
  const exerciseResponse = await fetch(exerciseUrl);

  const groupUrl = Api.regainApi.url + '/group/list';
  const groupResponse = await fetch(groupUrl);

  const groupExerciseUrl = Api.regainApi.url + '/groupExercise/list';
  const groupExerciseResponse = await fetch(groupExerciseUrl);

  const userGroupsUrl = Api.regainApi.url + '/userGroup/list';
  const userGroupsResponse = await fetch(userGroupsUrl);

  const exercises = await exerciseResponse.json();
  const groups = await groupResponse.json();
  const groupExercises = await groupExerciseResponse.json();
  const userGroups = await userGroupsResponse.json();

  return {
    exerciseData: exercises,
    groupData: groups,
    groupExerciseData: groupExercises,
    userGroupsData: userGroups
  };
}) satisfies PageServerLoad;