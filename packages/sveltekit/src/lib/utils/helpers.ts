export const calculateRealTime = (time: number | undefined) => {
  const minutes: number = Math.floor(time ? time / 60 : 0);
  const seconds: number = Math.floor(time ? time - minutes * 60 : 0);
  return minutes + ':' + seconds;
}

export const onlyUnique = (value: Exercise, index: number, self: Exercise[]) => {
  return self.findIndex(v => v.id === value.id) === index;
}

export const isEmpty = (obj: object) => {
  return obj && Object.keys(obj).length === 0;
};

/*
export const setupUserExercises = async (exercises: Exercise[], usersettings: User) => {
  let exerciseList: Exercise[] = [];

  for (let i = 0; i < exercises.length; i++) {
    for (let j = 0; j < usersettings.groups.length; j++) {
      if (userGroups.current[j].id === exercises[0]) {
        exerciseList.push(exercises[i]);
      }
    }
  }

  // Make me a filter for unique values
  const unique = exerciseList.filter(onlyUnique);
  exerciseList = unique;

  return { exerciseList };
};
*/

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
