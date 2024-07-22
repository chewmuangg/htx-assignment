import mongoose from "mongoose";

const audioSchema = mongoose.Schema({
    filename: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    uploadedBy: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

export const AudioModel = mongoose.model('Audio', audioSchema);