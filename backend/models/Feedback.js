import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Improvement', 'Bug', 'Support']
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Reviewed', 'Resolved']
    }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
