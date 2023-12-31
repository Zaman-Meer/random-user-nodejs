import mongoose, { Schema } from 'mongoose';
import { SectorType } from '../types';

const SectorSchema = new mongoose.Schema<SectorType>(
    {
        sector: {
            type: String,
            required: true
        },
        subsectors: {
            type: Schema.Types.Mixed,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<SectorType>('Sector', SectorSchema);
