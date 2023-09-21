import mongoose from 'mongoose';
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    IDUser: mongoose.Schema.Types.ObjectId,
    Roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: Boolean, required: true },
    phone: { type: Number, required: true },
    dayOfBirth: { type: mongoose.Schema.Types.Date, required: true },
    lastLogin: { type: Date },
    Address: { type: String, required: true },
    profilePicture: { type: String },
}, { timestamps: true });

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const User = mongoose.model('User', userSchema);

export default User;

