import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import { connectToDatabase } from './lib/db.js';
import messageRoutes from './routes/message.routes.js';
import cors from 'cors';
import { server,app } from './lib/socket.js';

import path from "path";


dotenv.config();  
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173", // Adjust as needed
  credentials: true, // Allow credentials to be sent with requests
}));


app.use("/api/auth",authRoutes);

app.use("/api/messages",messageRoutes);  

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

server.listen(PORT, () => {
  console.log('Server is running on port http://localhost:3000');
  connectToDatabase();
});