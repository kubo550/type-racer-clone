import type { SongData } from "types";

export const getRandomSong = (data: SongData[]): SongData => {
  const randIdx = Math.floor(Math.random() * data.length);
  return data[randIdx];
};
