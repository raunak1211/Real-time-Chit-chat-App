import express from 'express';
import { protectRoute } from '../middleware/authmiddleware.js';
import { getAllUsers,getMessages,sendMessage } from '../controllers/message.controller.js';
const messageRoutes = express.Router();


messageRoutes.get("/users",protectRoute, getAllUsers)
messageRoutes.get("/:id",protectRoute,getMessages);
messageRoutes.post("/send/:id", protectRoute, sendMessage);

export default messageRoutes;