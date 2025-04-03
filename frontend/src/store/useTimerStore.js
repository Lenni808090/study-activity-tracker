import { create } from "zustand";

export const useTimerStore = create((set,get) => ({

    isRunning: false,
    startTime: null,
    elapsedTime: 0,


    startTimer: () => {
        const currentTime = Date.now();
        localStorage.setItem('timerStartTime', currentTime.toString());
        localStorage.setItem('timerIsRunning', 'true');
        set({isRunning: true, startTime: currentTime});
    },

    stopTimer: () => {
        const { startTime } = get();
        const endTime = Date.now();
        const sessionDuration = endTime - startTime;

        localStorage.removeItem('timerStartTime');
        localStorage.setItem('timerIsRunning', 'false');

        set({
            isRunning: false,
            startTime: null,
            elapsedTime: get().elapsedTime + sessionDuration
        });
    },


    checkStoredTimer: () => {
        const storedStartTime = localStorage.getItem('timerStartTime');
        const storedIsRunning = localStorage.getItem('timerIsRunning') === 'true';

        if(storedStartTime && storedIsRunning){
            set({
                isRunning: true, 
                startTime: parseInt(storedStartTime),
            });
        }
    },

    resetTimer: () => {
        localStorage.removeItem('timerStartTime');
        localStorage.setItem('timerIsRunning', 'false');

        set({
            isRunning: false,
            startTime: null,
            elapsedTime: 0,
        });
    },
    
}));