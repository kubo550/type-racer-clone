import styled from "styled-components";
import { RaceWord } from "./RaceWord";

interface RaceTextProps {
  allWords: string[];
  curIdx: number;
  currentUserWord: string;
  handleChangeError: (isErr: boolean) => void;
}

interface StyledWordProps {
  underline?: boolean;
  alreadyCorrect?: boolean;
}

const StyledWord = styled.span<StyledWordProps>`
  color: ${({ alreadyCorrect }) => (alreadyCorrect ? "green" : "black")};
  border-bottom: ${({ underline }) => (underline ? `2px solid white` : "none")};
`;

export const RaceText: React.FC<RaceTextProps> = ({
  allWords,
  curIdx: index,
  currentUserWord,
  handleChangeError,
}) => (
  <p>
    {allWords.map((word, idx) => {
      const isCurrentWord = idx === index;
      return (
        <StyledWord
          key={idx}
          alreadyCorrect={idx < index}
          underline={isCurrentWord}
        >
          <RaceWord
            currentWordToType={word}
            userWord={currentUserWord}
            isCurrentWord={isCurrentWord}
            setError={handleChangeError}
          />
        </StyledWord>
      );
    })}
  </p>
);
