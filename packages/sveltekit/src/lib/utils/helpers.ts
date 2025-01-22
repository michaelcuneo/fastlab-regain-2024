import { userExercises } from './store';

export const calculateRealTime = (time: number | undefined) => {
  const minutes: number = Math.floor(time ? time / 60 : 0);
  const seconds: number = Math.floor(time ? time - minutes * 60 : 0);
  return minutes + ':' + seconds;
}

export const onlyUnique = (value: string, index: number, self: string) => {
  return self.indexOf(value) === index;
}

export const isEmpty = (obj: object) => {
  return obj && Object.keys(obj).length === 0;
};

export const setupUserExercises = async (exercises: Exercise[], usersettings: User) => {
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

  userExercises.set(exerciseList);
};

export const downloadFile = () => {
  console.log("ROFL");
}

export const fadeScale = (
  node: HTMLElement,
  { delay = 0, duration = 200, easing = (x: number) => x, baseScale = 0 }
) => {
  const o: number = +getComputedStyle(node).opacity;
  const m: RegExpMatchArray | null = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
  const s: string | 1 = m ? m[1] : 1;
  const is: number = 1 - baseScale;

  return {
    delay,
    duration,
    css: (t: number) => {
      const eased: number = easing(t);
      return `opacity: ${eased * o}; transform: scale(${eased * (s as number) * is + baseScale})`;
    }
  };
}
