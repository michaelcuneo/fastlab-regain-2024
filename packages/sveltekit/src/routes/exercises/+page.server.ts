import type { PageServerLoad } from "./$types";
import { Api } from "sst/node/api";

export const load = (async () => {
  // Fetch all exercises.
  const exerciseUrl = Api.regainApi.url + '/exercise/list';
  const exerciseResponse = await fetch(exerciseUrl);
  const exercises = await exerciseResponse.json();

  for (let i = 0; i < exercises.length; i++) {
    // Fetch all presignedURL's for each image in the exercise. 
    const imageUrl = Api.regainApi.url + '/presignedurl/' + exercises[i].imageKey;
    const imageResponse = await fetch(imageUrl);
    const image = await imageResponse.json();

    exercises[i].image = image.url;

    // Fetch all presignedURL's for each video in the exercise.
    const videoUrl = Api.regainApi.url + '/presignedurl/' + exercises[i].video;
    const videoResponse = await fetch(videoUrl);
    const video = await videoResponse.json();

    exercises[i].video = video;
  }

  return {
    exercises: exercises
  }
}) satisfies PageServerLoad;
