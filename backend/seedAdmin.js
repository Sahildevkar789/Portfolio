import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@sahil.dev';
        const password = 'adminpassword';

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('Admin user already exists');
        } else {
            await User.create({
                email,
                password,
                role: 'admin'
            });
            console.log('Admin user created successfully');
        }
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
