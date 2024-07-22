import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import path from 'path';
import { PORT, mongoDBURL } from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import tagsRoutes from "./routes/tagsRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome tutorial !');
});

// Serve static files from the public directory
app.use('/public/Audio', express.static(path.resolve('public/Audio')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/audio', audioRoutes);

// Connect to MongoDB
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");

        // run Express server
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });