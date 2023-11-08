import mongoose from 'mongoose';
const mongoose_delete = require('mongoose-delete');
import slug from 'mongoose-slug-generator';
const categorySchema = new mongoose.Schema({
    IDProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    CategoryName: { type: String, required: true },
    Description: { type: String },
    slug: { type: String, slug: 'CategoryName', unique: true },
}, { timestamps: true });
categorySchema.plugin(mongoose_delete, { overrideMethods: 'all' });
mongoose.plugin(slug);
const Category = mongoose.model('Category', categorySchema);
export default Category;

