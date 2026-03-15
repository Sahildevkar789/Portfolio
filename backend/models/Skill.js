import mongoose from 'mongoose';

const skillSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: ['Programming', 'Web Development', 'Tools', 'Concepts'],
        },
        name: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            default: 0, // e.g., 0-100 for a progress bar
        },
        icon: {
            type: String, // Icon identifier or URL
        }
    },
    {
        timestamps: true,
    }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
