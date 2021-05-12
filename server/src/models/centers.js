import mongoose from 'mongoose';

// schema for center

const centerSchema = new mongoose.Schema({
    center_id: {
        Number,
        minLength: 1,
        required: true
    },
    name: {
        String,
        minLength: 1,
        required: true,
    },
    address: {
        String,
        minLength: 1,
        required: true,
    },
    state_name: {
        String,
        required: true,
    },
    district_name: {
        String,
        required: true,
    },
    block_name: {
        String,
        required: true,
    },
    pincode: {
        String,
        required: true,
    },
    location: {
        lat: {
            type: number($float),
            minimum: 8.06,
            maximum: 37.1
        },
        lng: {
            type: number($float),
            minimum: 68.11,
            maximum: 97.41
        },
    },
}, { timestamps: true });

const Center = mongoose.model('Center', centerSchema);

export default Center;