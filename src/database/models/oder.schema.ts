import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');
import { statusOrder } from "./enum";

const orderSchema = new mongoose.Schema({
    IDOder: mongoose.Schema.Types.ObjectId,
    IDProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    IDCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    IDShipper: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    oderDate: {
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

orderSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Order = mongoose.model('Order', orderSchema);
export default Order;
