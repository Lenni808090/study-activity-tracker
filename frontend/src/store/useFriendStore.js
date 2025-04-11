import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useFriendStore = create((set) => ({
  friendRequests: [],
  sentRequests: [],
  addableUsers: [],
  friends: [],

  getFriendRequests: async () => {
    try {
      const res = await axiosInstance.get("/friend-requests/");
      set({ friendRequests: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch friend requests");
    }
  },

  getSentRequests: async () => {
    try {
      const res = await axiosInstance.get("/friend-requests/sent");
      set({ sentRequests: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch sent requests");
    }
  },

  getAddableUsers: async () => {
    try {
      const res = await axiosInstance.get("/friend-requests/search/users");
      set({ addableUsers: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  },

  sendFriendRequest: async (userId) => {
    try {
      await axiosInstance.post(`/friend-requests/send/${userId}`);
      toast.success("Friend request sent successfully");
      // Refresh sent requests
      const res = await axiosInstance.get("/friend-requests/sent");
      set({ sentRequests: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send friend request");
    }
  },

  acceptFriendRequest: async (requestId) => {
    try {
      const senderId = requestId; // Assuming the requestId contains the senderId
      await axiosInstance.post(`/friend-requests/accept/${senderId}`)
      toast.success("Friend request accepted");
      // Refresh bothf riend requests and friends list
      const [requestsRes, friendsRes] = await Promise.all([
        axiosInstance.get("/friend-requests/"),
        axiosInstance.get("/friend-requests/friends")
      ]);
      set({ 
        friendRequests: requestsRes.data,
        friends: friendsRes.data
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept friend request");
    }
  },

  rejectFriendRequest: async (requestId) => {
    try {
      await axiosInstance.post(`/friend-requests/reject/${requestId}`);
      toast.success("Friend request rejected");
      // Refresh friend requests
      const res = await axiosInstance.get("/friend-requests/");
      set({ friendRequests: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject friend request");
    }
  },

  getFriends: async () => {
    try {
      const res = await axiosInstance.get("/friend-requests/friends");
      set({ friends: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch friends");
    }
  }
}));