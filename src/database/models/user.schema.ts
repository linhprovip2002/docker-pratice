import mongoose from 'mongoose';
const mongoose_delete = require('mongoose-delete');
import { statusUser } from './enum';


const userSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    Roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', unique: true}],
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
userSchema.pre('save', function (next) {
    const currentDate = new Date();
    if (this.dayOfBirth && this.dayOfBirth >= currentDate) {
        // Birthday is in the future, so throw an error
        return next(new Error('Birthday must be in the past.'));
    }
    next();
});

userSchema.plugin(mongoose_delete , { overrideMethods: 'all',   deletedAt : true });

const User = mongoose.model('User', userSchema);

export default User;




