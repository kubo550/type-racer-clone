import { useMemo, useRef, useState } from "react";
import { useTimmer } from "hooks";
import {
  countWordsPerSec,
  getPlayableArray,
  handleErrorInput,
  inputControl,
} from "utils";
import { Button, Typography } from "@material-ui/core";
import { RaceText } from "./RaceText";
import type { ChangeEvent, FC } from "react";
import type { SongData } from "types";
import * as S from "./RaceGame.style";

interface ReactGameProps {
  data: SongData;
  refetch: () => void;
  addStats: (wps: number) => Promise<void>;
  statsRefetch: () => void;
}

type GameState = "before" | "waiting" | "playing" | "ended";

const RaceGame: FC<ReactGameProps> = ({
  data: {
    song: { text },
  },
  refetch,
  addStats,
  statsRefetch,
}) => {
  const mainInput = useRef<HTMLInputElement>(null);
  const [gameState, setGameState] = useState<GameState>("before");
  const [allWords, setAllWords] = useState<string[]>(getPlayableArray(text));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserWord, setCurrentUserWord] = useState("");
  const { timeToDisplay, time, restartCounter, stopCount } = useTimmer();

  const progress = (currentIndex / allWords.length) * 100; // in %
  const currentCorrectWord = allWords[currentIndex];

  const enableInput = useMemo(() => inputControl(mainInput), [mainInput]);

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentUserWord(e.target.value);
    checkWord(e.target.value);
  };

  const gameOver = async (time: number, words: string[]) => {
    setGameState("ended");
    stopCount();
    enableInput(false);
    const wps = countWordsPerSec(time, words);
    await addStats(wps);
    statsRefetch();
  };

  const newGame = () => {
    setGameState("waiting");
    setAllWords(getPlayableArray(text));
    setCurrentIndex(0);

    setTimeout(() => {
      setGameState("playing");
      enableInput(true);
      restartCounter();
    }, 2 * 1000 /* 2 seconds */);
  };

  const checkWord = (word: string) => {
    if (word === currentCorrectWord) {
      const nextWord = allWords[currentIndex + 1];
      setCurrentIndex(prev => ++prev);
      setCurrentUserWord("");

      if (nextWord) {
        mainInput.current!.placeholder = allWords[currentIndex + 1];
      } else {
        gameOver(time, allWords);
      }
    }
  };

  return (
    <>
      {gameState === "before" && (
        <Button variant='contained' color='secondary' onClick={newGame}>
          Start
        </Button>
      )}
      <Typography variant='h5'>{timeToDisplay}</Typography>
      <p style={{ marginLeft: progress + "%" }}>Car</p>
      <S.Road />

      <RaceText
        allWords={allWords}
        curIdx={currentIndex}
        currentUserWord={currentUserWord}
        handleChangeError={handleErrorInput(mainInput)}
      />

      <S.Input
        ref={mainInput}
        value={currentUserWord}
        onChange={handleKeyPress}
        disabled
      />
    </>
  );
};

export default RaceGame;
