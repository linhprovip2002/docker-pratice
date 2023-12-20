import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const reviewSchema = new mongoose.Schema({
    IDproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    IDcustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    comment: { type: String, required: true },
}, { timestamps: true });  

reviewSchema.post('save', async function (doc) {
    const Product = mongoose.model('Product');
    const product = await Product.findById(doc.IDproduct);
    const reviews = await mongoose.model('Review').find({ IDproduct: doc.IDproduct });
    let totalRating = 0;
    for (const review of reviews) {
        totalRating += review.rating;
    }
    product.rating = totalRating / reviews.length;
    await product.save();
}
);

reviewSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Review = mongoose.model('Review', reviewSchema);
export default Review;

