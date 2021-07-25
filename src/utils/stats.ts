import { firebase } from "firedb";

const db = firebase.firestore();

export const getStats = async (user: firebase.User | null | undefined) => {
  let data: number[] = [];
  console.log("refetching stats");

  if (user) {
    const statsRef = db.collection("stats").doc(user.uid);
    const doc = await statsRef.get();
    if (doc.exists) {
      data = doc.data()!.wps as number[];
    }
  }
  return data;
};

export const addToStatsWPS = async (
  user: firebase.User | null | undefined,
  wps: number /* WordsPerSeconds */
) => {
  if (user) {
    try {
      const statsRef = db.collection("stats").doc(user.uid);
      if ((await statsRef.get()).exists) {
        await db.runTransaction(async transaction => {
          const doc = await transaction.get(statsRef);
          transaction.update(statsRef, {
            wps: [...(doc.data()?.wps || []), wps],
          });
        });
      } else {
        await statsRef.set({ wps: [wps] });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log(wps, "saved localy");
  }
  console.log("saved", wps);
};

const getSumOFVals = (numArr: number[]): number => {
  return numArr.reduce((prev, curr) => prev + curr, 0);
};

export const countStats = (
  arr: number[] | undefined
): [string, string, string, string] => {
  if (!arr || !arr.length) {
    return ["0", "0", "0", "0"];
  }

  const max = Math.max(...arr);
  const last = arr[arr.length - 1];
  const avg = getSumOFVals(arr) / arr.length;
  const last10 = [...arr].slice(-10);
  const avgLast10 = getSumOFVals(last10) / last10.length;

  return [
    max.toFixed(2),
    last.toFixed(2),
    avg.toFixed(2),
    avgLast10.toFixed(2),
  ];
};
