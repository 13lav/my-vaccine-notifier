import mongoose from 'mongoose';
import District from './district'
// schema for state


const stateSchema = new mongoose.Schema({
    state_id: {
        Number,
        required: true
    },
    state_name: {
        String,
        minLength: 1,
        required: true
    },
    Districts: [District],
}, { timestamps: true });

const State = mongoose.model('State', stateSchema);

export default State;
