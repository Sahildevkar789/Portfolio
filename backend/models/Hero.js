import mongoose from 'mongoose';

const heroSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: 'Your Name'
        },
        tagline: {
            type: String,
            required: true,
            default: 'Your Tagline'
        },
        intro: {
            type: String,
            required: true,
            default: 'Short intro text'
        },
        profileImage: {
            type: String,
        },
        resumeLink: {
            type: String,
        },
        backgroundImage: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Hero = mongoose.model('Hero', heroSchema);

export default Hero;
