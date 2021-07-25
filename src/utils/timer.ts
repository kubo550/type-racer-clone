export const decimal = (num: number): string => num.toString().padStart(2, "0");

export const displayTime = (time: number | null): string => {
  const secondsInMin = 60;
  time = Number(time);
  if (time < 0) {
    return `00:00`;
  }
  const mn = Math.floor(time / secondsInMin);
  const sc = time % secondsInMin;
  return `${decimal(mn)}:${decimal(sc)}`;
};
