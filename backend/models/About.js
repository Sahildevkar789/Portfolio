import mongoose from 'mongoose';

const aboutSchema = mongoose.Schema(
    {
        bio: {
            type: String,
            required: true,
            default: 'Your Biography'
        },
        education: {
            type: [String],
            default: []
        },
        goals: {
            type: String,
        },
        interests: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const About = mongoose.model('About', aboutSchema);

export default About;
