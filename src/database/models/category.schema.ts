import mongoose from 'mongoose';
const mongoose_delete = require('mongoose-delete');
const categorySchema = new mongoose.Schema({
    IDCategory: mongoose.Schema.Types.ObjectId,
    IDProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    CategoryName: { type: String, required: true },
    Description: { type: String },
}, { timestamps: true });
categorySchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Category = mongoose.model('Category', categorySchema);
export default Category;

