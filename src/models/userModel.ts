import mongoose from 'mongoose';
import { UserType } from '../types';

const UserSchema = new mongoose.Schema<UserType>(
    {
        name: {
            type: String,
            required: true
        },
        sectors: {
            type: [String],
            required: true
        },
        agree_to_terms: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<UserType>('User', UserSchema);
