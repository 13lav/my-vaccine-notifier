import mongoose from 'mongoose';
import Center from './center.js';

// schema for district

const districtSchema = new mongoose.Schema({
    district_id: {
        type: Number,
        required: true
    },
    district_name: {
        type: String,
        minLength: 1,
        required: true
    },
    state_id: {
        type: Number,
        required: true
    },
    state_name: {
        type: String,
        minLength: 1,
        required: true
    },
    centers: [Center.schema],
}, { timestamps: true });

const District = mongoose.model('District', districtSchema);

export default District;