import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTimetableStore = create((set) => ({
      timetable: {
        monday: Array(6).fill(""),
        tuesday: Array(6).fill(""),
        wednesday: Array(6).fill(""),
        thursday: Array(6).fill(""),
        friday: Array(6).fill("")
      }, 

    getTimetable: async () => {
        try {
            const res = await axiosInstance.get("/timetable/getTimetable");
            set({ timetable: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get timetable");
        }
    },

    saveTimetable: async (data) => {
        try {
            const res = await axiosInstance.post("/timetable/saveTimetable", data);
            set({ timetable: res.data });
            toast.success("Timetable saved successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save timetable");
        }
    }
}));