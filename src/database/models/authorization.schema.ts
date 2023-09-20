import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const permissionSchema = new mongoose.Schema({
    IDpermission: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true, length: 20 },
    description: { type: String, required: true },
}, { timestamps: true });
permissionSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const roleSchema = new mongoose.Schema({
    IDrole: mongoose.Schema.Types.ObjectId,
    IDPermission: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    roleName: { type: String, required: true, unique: true, length: 20 },
    roleDescription: { type: String, required: true },
}, { timestamps: true });
roleSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Permission = mongoose.model('Permission', permissionSchema);
const Role = mongoose.model('Role', roleSchema);
export { Permission, Role };