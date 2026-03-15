import mongoose from 'mongoose';

const certificationSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
        certificateImage: {
            type: String,
        },
        certificateLink: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;
