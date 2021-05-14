import mongoose from 'mongoose';
import Center from './center';

// schema for district

const districtSchema = new mongoose.Schema({
    district_id: {
        Number,
        required: true
    },
    district_name: {
        String,
        minLength: 1,
        required: true
    },
    state_id: {
        Number,
        required: true
    },
    state_name: {
        String,
        minLength: 1,
        required: true
    },
    centers: [Center],
}, { timestamps: true });

const District = mongoose.model('District', districtSchema);

export default District;