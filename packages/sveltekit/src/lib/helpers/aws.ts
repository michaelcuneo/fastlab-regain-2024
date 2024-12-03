import { error, userExercises } from './store';
import { onlyUnique } from './helpers';

export const isEmpty = (obj: object) => {
	return obj && Object.keys(obj).length === 0;
};

export const handleErrors = (err: any) => {
	if (err.errors)
		error.set({
			status: true,
			message: err.errors[0].message
		});
	if (err.message)
		error.set({
			status: true,
			message: err.message
		});
};

export let setupUserExercises = async (exercises: exerciseType[], usersettings: userType) => {
	let exerciseList = [];
	for (let i = 0; i < exercises.length; i++) {
		for (let j = 0; j < usersettings.groups.items.length; j++) {
			if (usersettings.groups.items[j].group.id === exercises[i].exerciseGroups.items[0].groupID) {
				exerciseList.push(exercises[i]);
			}
		}
	}

	let unique = exerciseList.filter(onlyUnique);
	exerciseList = unique;
	// console.log(exerciseList);
	userExercises.set(exerciseList);
};
