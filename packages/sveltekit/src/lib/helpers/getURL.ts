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
    var
      c: number,
      d: number,
      e: number,
      f: number,
      g: number,
      h: number,
      i: number,
      j: number,
      o: number,
      b: string,
      b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      k: number = 0,
      l: number = 0,
      m: string = "",
      n: string[] = [];
    if (!a) return a;
    do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e,
      f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
    return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) : m) + "===".slice(o || 3);
  }

  const strRequest: string = JSON.stringify(request);
  const encRequest: string = b2a(strRequest);
  const url: string = `${domain}${encRequest}`;

  return url;
};
