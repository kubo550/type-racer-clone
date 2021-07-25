import { songApi } from "./config";
import { SongData } from "types";

export const getSong = async (): Promise<SongData> => {
  try {
    const res = await songApi.get("/song");
    if (res.status !== 200) {
      throw new Error("Unexpect error");
    }
    return res.data as SongData;
  } catch (err) {
    throw new Error("Unexpect error");
  }
};
