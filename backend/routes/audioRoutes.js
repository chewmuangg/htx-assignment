import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { AudioModel } from "../models/Audio.js";

const router = express.Router();

// uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve('public/Audio'));
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage });

// Route to upload an Audio file
router.post('/upload', upload.single('audioFile'), async (req, res) => {
    try {
        // create audio file upload
        const { title, author, description, tags, uploadedBy } = req.body;
        const audioFile = req.file;

        const newAudio = {
            filename: audioFile.filename,
            title,
            author,
            description,
            tags: tags.split(','),
            uploadedBy
        };

        const audio = await AudioModel.create(newAudio);
        return res.status(201).json({ message: 'File uploaded successfully', audio });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to get all audio files uploaded by user
router.get('/:uploadedBy', async (req, res) => {
    try {

        const { uploadedBy } = req.params;

        // fetch audio files uploaded by user
        const audio = await AudioModel.find({ uploadedBy: uploadedBy });

        return res.status(200).json({
            count: audio.length,
            data: audio
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a particular audio file
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // find audio file by id
        const audio = await AudioModel.findById(id);
        if (!audio) {
            return res.status(404).json({ message: "Audio file not found." });
        }

        // Delete the file from the file system
        const filePath = path.resolve('public/audio', audio.filename);
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
                return res.status(500).json({ message: 'Error deleting file from server' });
            }

            // Remove the audio file document from the database
            await AudioModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Audio file deleted successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;