import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useGradeStore = create((set, get) => ({
    grades: [],

    saveSpokenGrade: async (data) => {
        try {
            const res = await axiosInstance.post("/grades/saveSpokenGrade", data);
            toast.success(res.data.message);
            await get().getGrades(data.subjectId);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    saveWrittenGrade: async (data) => {
        try {
            const res = await axiosInstance.post("/grades/saveWrittenGrade", data);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    getGrades: async (subjectId) => {
        try {
            const res = await axiosInstance.post("/grades/getGrades", { subjectId });
            set({ grades: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));