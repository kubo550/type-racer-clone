interface RaceWordProps {
  currentWordToType: string;
  userWord: string;
  isCurrentWord: boolean;
  setError: (isErr: boolean) => void;
}

export const RaceWord: React.FC<RaceWordProps> = ({
  currentWordToType,
  userWord,
  isCurrentWord,
  setError,
}) => (
  <>
    {[...currentWordToType].map((letter, i) => {
      if (isCurrentWord) {
        const isError =
          userWord !== currentWordToType.slice(0, userWord.length);
        setError(isError);
      }
      const isLetterTyppedAlready = userWord.length > i;
      const isCorrectLetter = userWord[i] === letter;

      const color = isCurrentWord
        ? isLetterTyppedAlready
          ? isCorrectLetter
            ? "green"
            : "red"
          : "black"
        : "inherit";

      return (
        <span key={i} style={{ color }}>
          {letter}
        </span>
      );
    })}
  </>
);
