import mongoose from 'mongoose';

const contactInfoSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            default: 'email@example.com'
        },
        linkedin: {
            type: String,
        },
        github: {
            type: String,
        },
        phone: {
            type: String,
        },
        location: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

export default ContactInfo;
