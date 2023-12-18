import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const reviewSchema = new mongoose.Schema({
    IDproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    IDcustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    reply: [
        {
            IDadmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String, required: true },
        }
    ],
    reaction: [
        {
            IDcustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reaction: { type: String, enum: ['like', 'dislike']},
        }
    ],
}, { timestamps: true });  

reviewSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Review = mongoose.model('Review', reviewSchema);
export default Review;

