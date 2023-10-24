import { statusPayment } from "./enum";
import mongoose from 'mongoose';
const mongoose_delete = require('mongoose-delete');
const paymentSchema = new mongoose.Schema({
    statusPayment: { type: String, required: true, enum: Object.values(statusPayment) },
}, { timestamps: true });

paymentSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;