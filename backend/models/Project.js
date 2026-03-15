import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        technologies: {
            type: [String],
            required: true,
        },
        image: {
            type: String, // URL or base64
            required: true,
        },
        githubLink: {
            type: String,
            required: true,
        },
        liveLink: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
