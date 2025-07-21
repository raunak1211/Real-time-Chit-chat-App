import express from 'express';
import { signup , login , logout, updateProfile ,checkUser} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/authmiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);

authRoutes.post('/login', login);

authRoutes.get('/logout', logout);

authRoutes.put("/update-profile",protectRoute,updateProfile);

authRoutes.get("/check", protectRoute, checkUser);


export default authRoutes;