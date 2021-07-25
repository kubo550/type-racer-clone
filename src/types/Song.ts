type Song = {
  text: string;
  artist: string;
  title: string;
};

export type SongData = {
  song: Song;
  readonly createdBy: string;
  readonly createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};
