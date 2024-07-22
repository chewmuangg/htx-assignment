import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true}
});

export const TagModel = mongoose.model('Tag', tagSchema);