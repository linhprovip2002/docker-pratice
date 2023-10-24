import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const reviewSchema = new mongoose.Schema({
    IDproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    IDcustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5  },
    comment: { type: String, required: true },
}, { timestamps: true });  

reviewSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Review = mongoose.model('Review', reviewSchema);
export default Review;

