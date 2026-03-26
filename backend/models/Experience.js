import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
    {
        role: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, default: '' },
        startDate: { type: String, required: true },
        endDate: { type: String, default: 'Present' },
        description: { type: [String], default: [] }, // array of bullet points
        type: { type: String, default: 'Internship' }, // Internship | Full-time | Part-time | Freelance
    },
    { timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
