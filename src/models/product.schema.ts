import mongoose from "mongoose";
import { mongoose_delete  } from 'mongoose-delete';

const productSchema = new mongoose.Schema({
    IDProduct : mongoose.Schema.Types.ObjectId,
    IDstock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
    type: { type: String, required: true, unique: true, length: 20 },
    nameProduct: { type: String, required: true, unique: true, length: 20 },
    pictureLinks: [{ type: String }],
    description: { type: String, required: true },
    color: [{ type: String, required: true, unique: true, length: 20 }],
    size: [{ type: String, required: true, unique: true, length: 20 }],
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });

productSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Product = mongoose.model('Product', productSchema);
export default Product;
    