import mongoose from 'mongoose';

export const notifierSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    users: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        }
    ]
}, { timestamps: true }, { strict: false });

const Notifier = mongoose.model('Notifier', notifierSchema);

export default Notifier;