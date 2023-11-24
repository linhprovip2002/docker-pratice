import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');
import { statusOrder } from "./enum";

const discountSchema = new mongoose.Schema({
    IDDiscount: mongoose.Schema.Types.ObjectId,
    IDSupplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    IDproduct: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    typeDiscount: { type: String, required: true },
    discount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
    IDProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    IDCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    orderDate: {
        type: Date,
        required: true,
    },
    statusOder: {
        type: String,
        required: true,
        enum: Object.values(statusOrder), // Use Object.values to get the enum values
    },
    ShipAddress: { type: String, required: true },
    ShipPhone: { type: String, required: true },
}, { timestamps: true });

discountSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
orderSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Discount = mongoose.model('Discount', discountSchema);
const Order = mongoose.model('Order', orderSchema);
export { Discount, Order }
