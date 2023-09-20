import mongoose, { Schema } from 'mongoose';
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    IDUser: Schema.Types.ObjectId,
    Roles: [{ type: Schema.Types.ObjectId, ref: 'Role', required: true }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    dayOfBirth: { type: Schema.Types.Date, required: true },
    lastLogin: { type: Date },
    Address: { type: String, required: true },
    profilePicture: { type: String },
}, { timestamps: true });

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const User = mongoose.model('User', userSchema);

export default User;

