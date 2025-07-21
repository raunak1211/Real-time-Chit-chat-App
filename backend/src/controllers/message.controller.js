import User from "../models/user.models.js";
import Message from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";
export const getAllUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ "message": "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id:usersToChatId} = req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: usersToChatId },
                { senderId: usersToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(message);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ "message": "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try{
        const { text,image } = req.body;
        const { id: usersToChatId } = req.params;
        const myId = req.user._id;

        
        let imageUrl ;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: myId,
            receiverId: usersToChatId,
            text,
            image: imageUrl
        })
        await newMessage.save();

        const receiverSocketId =getRecieverSocketId(usersToChatId);

        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);


        res.status(201).json(newMessage);
    } }catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ "message": "Internal server error" });
    }
};