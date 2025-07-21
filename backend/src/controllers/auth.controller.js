import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(404).json({"message":"Fill All The Fields Correctly"});
        }
        if(password.length<6){
            return res.status(404).json({"message":"Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(404).json({"message":"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                fullName: newUser.fullName,
                email: newUser.email,
                password: newUser.password,
                profilePic: newUser.profilePic,
                _id: newUser._id,
            });
        }else{
            res.status(404).json({"message":"User creation failed"});
        }

    }catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({"message":"Internal server error"});
    }
};

export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({"message":"Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({"message":"Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            _id: user._id,
        });

    }catch(error){
        console.error("Error during login:", error);
        res.status(500).json({"message":"Internal server error"});
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0,
            httpOnly: true, // prevent xss attacks
            sameSite: 'strict', // prevent csrf attacks
            secure: process.env.NODE_ENV !== "development", // use secure cookies in production

        });
        res.status(200).json({"message":"Logout successful"});
    }catch(error){
        console.error("Error during logout:", error.message);
        res.status(500).json({"message":"Internal server error"});

    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({"message":"Profile picture is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: uploadResponse.secure_url},
            {new: true}
        );
        res.status(200).json({
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            _id: updatedUser._id,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({"message":"Internal server error"});
    }
     
};

export const checkUser = (req, res) => {
    try{
        res.status(200).json(req.user);
    } catch(error){
        console.error("Error checking user:", error.message);
        res.status(500).json({"message":"Internal server error"});  
    }
}
