import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const accountSchema = new mongoose.Schema({
    IDaccount: mongoose.Schema.Types.ObjectId,
    IDUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true, unique: true, maxlength: 20 }, // Use 'maxlength' instead of 'length'
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: true },
    passwordResetToken: { type: String, required: true },
    lastLogin: { type: Date },
}, { timestamps: true });

// Apply the mongoose-delete plugin to the schema
accountSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Account = mongoose.model('Account', accountSchema);
export default Account;