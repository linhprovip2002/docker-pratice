import mongoose from 'mongoose';
const mongoose_delete = require('mongoose-delete');
import { statusUser } from './enum';


const userSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    Roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: Boolean },
    phone: { type: Number },
    dayOfBirth: { type: mongoose.Schema.Types.Date },
    lastLogin: { type: Date },
    Address: { type: String },
    profilePicture: { type: String },
    isActive: { type: String , enum: statusUser , default: statusUser.ACTIVE }
}, { timestamps: true });

userSchema.plugin(mongoose_delete , { overrideMethods: 'all',   deletedAt : true });

const User = mongoose.model('User', userSchema);

export default User;




