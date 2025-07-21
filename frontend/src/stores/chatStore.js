import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./authStore";



export const useChatStore = create((set , get) => ({
    messages : [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    

    getUsers : async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            toast.error("Failed to load users");
            console.error("Get users error:", error);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error("Failed to load messages");
            console.error("Get messages error:", error);
        } finally {
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        } catch (error) {
            toast.error("Failed to send message");
            console.error("Send message error:", error);
        }
    },

    suscribeToMessages : () => {
        const {selectedUser} = get();

        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;


        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId != selectedUser._id) return ;
            set({ messages: [...get().messages, newMessage]});
        });
    },

    unSuscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (user) => {
        set({selectedUser: user});
    },


}));

