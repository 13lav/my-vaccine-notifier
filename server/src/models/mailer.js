import mongoose from 'mongoose';

export const mailerSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    users: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        }
    ],
    // mail_info: [
    //     {
    //         email: {
    //             type: String,
    //             required: true,
    //         },
    //         email: {
    //             type: String,
    //             required: true,
    //         }
    //     }
    // ],
}, { timestamps: true }, { strict: false });

const Mailer = mongoose.model('Mailer', mailerSchema);

export default Mailer;