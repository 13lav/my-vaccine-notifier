import mongoose from 'mongoose';

// schema for center

const centerSchema = new mongoose.Schema({
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
        minimum: 8.06,
        maximum: 37.1
    },
    long: {
        type: Number,
        minimum: 68.11,
        maximum: 97.41
    },
    fee_type: {
        type: String,
        required: true,
    },
    vaccine: {
        type: String,
        required: true,
    },
    min_age_limit: {
        type: Number,
    },
    sessions: [
        {
            session_id: {
                type: String($uuid),
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
    ],
    users: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'User'
        },
    ]
}, { timestamps: true });

const Center = mongoose.model('Center', centerSchema);

export default Center;