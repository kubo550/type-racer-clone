import { useCallback, useEffect, useState } from "react";
import { displayTime } from "utils";

let timeInterval: NodeJS.Timeout;

const useTimmer = (initialTimeInSeconds?: number) => {
  const [time, setTime] = useState(initialTimeInSeconds || 0);
  const [isCounting, setisCounting] = useState(false);

  const startCount = useCallback((): void => {
    if (isCounting) {
      return;
    }
    setisCounting(true);
    timeInterval = setInterval(() => {
      setTime(prev => Number(prev) + 1);
    }, 1000);
  }, [isCounting]);

  const stopCount = (): void => {
    clearInterval(timeInterval);
    setisCounting(false);
  };

  const restartCounter = (): void => {
    stopCount();
    setTime(0);
    startCount();
  };

  const timeToDisplay = displayTime(time);

  return {
    time,
    stopCount,
    startCount,
    restartCounter,
    displayTime,
    timeToDisplay,
    isCounting,
  };
};

export default useTimmer;
