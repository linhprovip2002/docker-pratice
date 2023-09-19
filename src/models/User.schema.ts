import mongoose, { Schema } from 'mongoose';
import mongoose_delete from 'mongoose-delete';
const userSchema = new mongoose.Schema({
    IDUser: Schema.Types.ObjectId,
    Roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    fistName: {String , required : true},
    lastName: {String , required : true},
    gender: {String , required : true},
    phone: {String , required : true},
    dayOfBirth: {Date , required : true},
    lastLogin: { type: Date },
    registerAt: { type: Date },
    Address: {String , required : true},
    profilePicture: {String},
}, { timestamps: true });
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const User = mongoose.model('User', userSchema);
export default User;
    

