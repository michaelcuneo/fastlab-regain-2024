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

export const setupUserExercises = async (exercises: exerciseType[], usersettings: userType) => {
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

export const getURL = async (key: string) => {
  const domain: string = 'https://d2j7tesiypr8cp.cloudfront.net/';
  const stagingBucket: string = 'regain-storage150045-staging';
  // const liveBucket: string = 'regain-storage195823-production';

  const request: object = {
    bucket: stagingBucket,
    key: `public/${key}`,
    edits: {
      resize: {
        width: 320,
        fit: 'cover',
      },
    },
  };

  const b2a = (a: string) => {
    let
      c: number,
      d: number,
      e: number,
      f: number,
      g: number,
      h: number,
      i: number,
      j: number,
      o: number,
      k: number = 0,
      l: number = 0,
      m: string = "";

    const n: string[] = [];
    const b: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    if (!a) return a;
    do
      c = a.charCodeAt(k++),
        d = a.charCodeAt(k++),
        e = a.charCodeAt(k++),
        j = c << 16 | d << 8 | e,
        f = 63 & j >> 18,
        g = 63 & j >> 12,
        h = 63 & j >> 6,
        i = 63 & j,
        n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i);
    while (k < a.length);

    return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) : m) + "===".slice(o || 3);
  }

  const strRequest: string = JSON.stringify(request);
  const encRequest: string = b2a(strRequest);
  const url: string = `${domain}${encRequest}`;

  return url;
};
