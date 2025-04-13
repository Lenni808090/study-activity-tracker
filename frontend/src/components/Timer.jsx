import { useEffect, useState } from "react";
import { useTimerStore } from "../store/useTimerStore";
import { useSubjectStore } from "../store/useSubjectStore";
import { Play, Square, RotateCcw, Check } from "lucide-react";
import SubjectHomeworkSection from "./SubjectHomeworkSection";

const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);
  const hours = Math.floor((ms / (60 * 60 * 1000)) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const Timer = ({ subjectId }) => {
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
};

  return (
    <div className="container mx-auto px-4 space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-base-200">
            <div className="text-7xl font-mono font-bold mb-12">{displayTime}</div>
            <div className="flex gap-4">
              <button
                className="btn btn-primary btn-lg"
                onClick={isRunning ? stopTimer : startTimer}
              >
                {isRunning ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
                {isRunning ? "Stop" : "Start"}
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={resetTimer}
                disabled={isRunning}
              >
                <RotateCcw className="h-6 w-6" />
                Reset
              </button>
            </div>
            <button
              className="btn btn-success btn-lg mt-8"
              onClick={handleFinish}
              disabled={elapsedTime === 0}
            >
              <Check className="h-6 w-6" />
              Finish
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <SubjectHomeworkSection subjectId={subjectId} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
