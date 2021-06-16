import mongoose from 'mongoose';

// schema for tracker

export const sessionSchema = new mongoose.Schema({
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

}, { timestamps: true }, { strict: false });

const Session = mongoose.model('Session', sessionSchema);

export default Session;