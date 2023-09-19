import mongoose from "mongoose";
import { mongoose_delete  } from 'mongoose-delete';

const accountSchema = new mongoose.Schema({
    IDUser: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true, unique: true, length: 20 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: true },
    passwordResetToken: { type: String, required: true },
    lastLogin: { type: Date },
}, { timestamps: true });
accountSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Account = mongoose.model('Account', accountSchema);
export default Account;
