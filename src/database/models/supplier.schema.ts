import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const supplierSchema = new mongoose.Schema({
    IDSupplier : mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName: { type: String, required: true, unique: true, length: 20 },
    description: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    logoImage: { type: String },
    address: { type: String, required: true },
}, { timestamps: true });


const stockSchema = new mongoose.Schema({
    IDStock : mongoose.Schema.Types.ObjectId,
    IDProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    supplierID: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    storageAddress: { type: String, required: true },
    storageName: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });

supplierSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
stockSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Supplier = mongoose.model('Supplier', supplierSchema);
const Stock = mongoose.model('Stock', stockSchema);
export { Supplier, Stock };