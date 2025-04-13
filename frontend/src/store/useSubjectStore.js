import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubjectStore = create((set) => ({
    subjects: [],
    selectedSubject: null,
    name: "",

    getSubjects: async () => {
      set({ loadingSubjects: true, subjects: [] });
      try {
        const res = await axiosInstance.get("/subjects/getSubjects");
        set({ subjects: res.data.subjects, loadingSubjects: false });
      } catch (error) {
        toast.error(error.response.data.message);
        set({ loadingSubjects: false });
      }
    },

    getSubjectsOfUser: async (userId) => {
      set({ loadingSubjects: true, subjects: [] });
      try {
        const res = await axiosInstance.get(`/social/subjects/${userId}`);
        set({ subjects: res.data.subjects, loadingSubjects: false });
        set({name: res.data.fullName})
      } catch (error) {
        toast.error(error.response.data.message);
        set({ loadingSubjects: false });
      }
    },

    updateDurationStudied: async (data) => {
        try {
            const res = await axiosInstance.post("/subjects/updateStudyDuration", data);
            set({ subjects: res.data.subjects });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    createSubject: async (data) => {
        try {
            const res = await axiosInstance.post("/subjects/createSubject", data);
            set({ subjects: res.data.subjects });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    deleteSubjects: async (data) => {
        try {
            const res = await axiosInstance.post("/subjects/deleteSubject", data);
            set({ subjects: res.data.subjects });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));