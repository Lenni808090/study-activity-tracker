import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const useHomeworkStore = create((set) => ({

    homework: [],
    allHomework: [],


    addHomework: async (data) => {
        try {
            const res = await axiosInstance.post("/homework/addHomework", data);
            set({homework: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    getHomework: async (subjectId) => {
        try {
            const res = await axiosInstance.get(`/homework/getHomework/${subjectId}`);
            set({homework: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    getEveryHomework: async () => {
        try {
            const res = await axiosInstance.get(`/homework/getEveryHomewor k/`);
            set({allHomework: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    completeHomework: async (data) => {
        try{
            const res = await axiosInstance.post(`/homework/completeHomework`, data);
            set({homework: res.data});
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to complete homework");
        }
    }
    


}));