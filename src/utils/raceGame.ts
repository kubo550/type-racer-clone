import type { RefObject } from "react";

export const inputControl =
  (input: RefObject<HTMLInputElement>) => (isEnable: boolean) => {
    if (!input.current) return;
    input.current.disabled = !isEnable;
    input.current.placeholder = isEnable ? "" : "poczekaj na start";
    input.current.style.backgroundColor = isEnable ? "white" : "gray";
    isEnable && input.current.focus();
  };

export const handleErrorInput =
  (input: RefObject<HTMLInputElement>) => (isErr: boolean) => {
    if (!input.current) return;
    input.current.style.backgroundColor = isErr ? "red" : "white";
  };

export const getPlayableArray = (text: string): string[] => {
  return text
    .split(/\s+/)
    .map((word, i, arr) => (i === arr.length - 1 ? word : word + " "));
};

export const countWordsPerSec = (time: number, allWords: string[]): number => {
  const chars = [...allWords].map(word => [...word]).flat(); // array of singe chars
  const aVGLettersInWord = 5; // average number of letters in word in english
  const wps = ((chars.length / time) * 60) / aVGLettersInWord;
  return wps;
};
