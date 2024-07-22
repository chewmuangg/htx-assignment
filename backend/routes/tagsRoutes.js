import express from "express";
import { TagModel } from "../models/Tag.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tags = await TagModel.find();
        return res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;