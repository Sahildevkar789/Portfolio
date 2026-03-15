import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    board: {
        type: String,
    },
    year: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
    },
    field: {
        type: String,
    },
    status: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
