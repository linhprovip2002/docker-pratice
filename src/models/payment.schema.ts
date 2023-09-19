import { statusPayment } from "./enum";
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
const paymentSchema = new mongoose.Schema({
    IDPayment: mongoose.Schema.Types.ObjectId,
    statusPayment: { type: statusPayment, required: true },
}, { timestamps: true });

paymentSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;