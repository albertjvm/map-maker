export const random = (min = 0, max = 1, intOnly = false) => {
  let r = Math.random() * (max - min);
  if (intOnly) {
    r = Math.floor(r);
  }
  return r + min;
};

export const randomInt = (min = 0, max = 10) => {
  return  random(min, max, true);
};

export const randomPointWithinRadius = (x, y, r) => {
  let angle = random(0, 2 * Math.PI);
  let radius = random(0, r);

  return [
    x + radius * Math.sin(angle),
    y + radius * Math.cos(angle),
  ];
};

export const normal = (x, stdDev = 1) => {
  return 1/(2 * Math.PI * stdDev * stdDev) * Math.exp(
    (x * x) / (-2 * stdDev * stdDev)
  );
};