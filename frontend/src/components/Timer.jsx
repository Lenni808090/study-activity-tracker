import { useEffect, useState } from "react";
import { useTimerStore } from "../store/useTimerStore";
import { useSubjectStore } from "../store/useSubjectStore";
import { Play, Square, RotateCcw, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);
  const hours = Math.floor((ms / (60 * 60 * 1000)) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const Timer = ({ subjectId }) => {
  const navigate = useNavigate();
  const { updateDurationStudied } = useSubjectStore();
  const {
    isRunning,
    startTime,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    checkStoredTimer,
  } = useTimerStore();

  const [displayTime, setDisplayTime] = useState("00:00:00");

  useEffect(() => {
    checkStoredTimer();
  }, [checkStoredTimer]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime + elapsedTime;
        setDisplayTime(formatTime(timeElapsed));
      }, 1000);
    } else {
      setDisplayTime(formatTime(elapsedTime));
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, startTime, elapsedTime]);

  const handleFinish = async () => {
    if (isRunning) {
      stopTimer();
    }
    await updateDurationStudied({
      subjectId: subjectId,  // Change this to match what backend expects
      duration: elapsedTime,
    });
    resetTimer();
    navigate('/');
};

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-base-200">
      <div className="text-4xl font-mono font-bold">{displayTime}</div>
      <div className="flex gap-2">
        <button
          className="btn btn-primary"
          onClick={isRunning ? stopTimer : startTimer}
        >
          {isRunning ? (
            <Square className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="btn btn-ghost"
          onClick={resetTimer}
          disabled={isRunning}
        >
          <RotateCcw className="h-5 w-5" />
          Reset
        </button>
      </div>
      <button
        className="btn btn-success mt-4"
        onClick={handleFinish}
        disabled={elapsedTime === 0}
      >
        <Check className="h-5 w-5" />
        Finish
      </button>
    </div>
  );
};

export default Timer;
