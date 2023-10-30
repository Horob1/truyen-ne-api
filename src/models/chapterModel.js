import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '...']
    },
    content: {
        type: String,
        required: [true, '...']
    },
    
})