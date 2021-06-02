import mongoose from 'mongoose';
import District from './district.js'
// schema for state


const stateSchema = new mongoose.Schema({
    state_id: {
        type: Number,
        required: true
    },
    state_name: {
        type: String,
        minLength: 1,
        required: true
    },
    Districts: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'District'
        },
    ],
}, { timestamps: true });

const State = mongoose.model('State', stateSchema);

export default State;
