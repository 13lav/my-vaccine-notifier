import mongoose from 'mongoose';

// schema for center

const centerSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    center_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        minLength: 2,
        required: true,
    },
    address: {
        type: String,
        minLength: 2,
        required: true,
    },
    state_name: {
        type: String,
        required: true,
    },
    district_name: {
        type: String,
        required: true,
    },
    block_name: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number,
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    fee_type: {
        type: String,
        required: true,
    },
    sessions: [
        {
            session_id: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            available_capacity: {
                type: Number,
            },
            min_age_limit: {
                type: Number,
            },
            vaccine: {
                type: String,
                required: true,
            },
            available_capacity_dose1: {
                type: Number,
            },
            available_capacity_dose2: {
                type: Number,
            },
        }
    ]
}, { timestamps: true }, { strict: false });

const Center = mongoose.model('Center', centerSchema);

export default Center;