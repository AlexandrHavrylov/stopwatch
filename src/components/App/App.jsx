import { WatchEl } from "components/App.styled";
import { StopwatchContainer } from "components/App.styled";
import { Button } from "components/App.styled";
import { useState, useEffect } from "react";
import { interval, Subject, takeUntil } from "rxjs";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const timer$ = new Subject();
    interval(1000)
      .pipe(takeUntil(timer$))
      .subscribe(() => {
        isStarted && setTime((prevTime) => prevTime + 1);
      });

    return () => {
      timer$.next();
      timer$.complete();
    };
  }, [isStarted]);

  const handleOnStartClick = () => {
    setIsStarted((prevState) => !prevState);
    isStarted && setTime(0);
  };

  const handleOnWaitClick = () => {
    isClicked && setIsStarted(false);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <>
      <StopwatchContainer>
        <WatchEl>{("0" + (Math.floor(time / 3600) % 24)).slice(-2)} :</WatchEl>
        <WatchEl>{("0" + (Math.floor(time / 60) % 60)).slice(-2)} :</WatchEl>
        <WatchEl>{("0" + (Math.floor(time) % 60)).slice(-2)}</WatchEl>
      </StopwatchContainer>
      <Button type="button" clickType={"start"} onClick={handleOnStartClick}>
        {isStarted ? "Stop" : "Start"}
      </Button>
      <Button type="button" clickType={"wait"} onClick={handleOnWaitClick}>
        Wait
      </Button>
      <Button
        clickType={"reset"}
        type="button"
        onClick={() => {
          setTime(0);
          setIsStarted(true);
        }}
      >
        Reset
      </Button>
    </>
  );
}
