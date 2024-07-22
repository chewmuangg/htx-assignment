import express from "express"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";


const router = express.Router();
const JWT_SECRET = 'default_secret';

// Route for Creating a new User
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if all fields are filled
        if ( !username || !password ) {
            return res.status(400).json({
                message: "Fill in all fields (username and password)!"
            });
        }

        // check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new User
        const newUser = {
            username: username,
            password: hashedPassword
        };

        const user = await UserModel.create(newUser);
        return res.status(201).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route for Log In
router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        // check if username and password are provided
        if ( !username || !password ) {
            return res.status(400).json({
                message: "Username and password are required!"
            });
        }

        // check if the user exists
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid user."
            });
        } else {
            // user exists, check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Generate token
                const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({
                    message: "Success",
                    token
                });
            } else {
                return res.status(400).json({
                    message: "Wrong password."
                });
            }
            
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;