import { Role,Permission } from "../../database/models";
class roleService {
    async getAllRoles() {
        try {
            const roles = await Role.find({deleted:false}).populate({path:'IDPermission',select:'title'})
            return roles;
        } catch (error) {
            throw error;
        }
    }
    async getPermissions(page?, limit?) {
        try {
            const skipCount = (page - 1) * limit
            const permissions = await Permission.find({deleted:false}).limit(limit).skip(skipCount);
            return permissions;
            
        } catch (error) {
            throw error;
        }
    }
    async addPermissionForRole(roleID, ids) {
        try {
            const role = await Role.findOneAndUpdate(
                { _id: roleID, deleted: false },
                {
                    $addToSet: { IDPermission: { $each: ids } }
                },
                { new: true }
            );
            if(!role) throw new Error('Role not found');
        } catch (error) {
            throw error;
        }
    }
    async removePermissionForRole(roleID, ids) {
        return await Role.findOneAndUpdate(
            { _id: roleID, deleted: false },
            {
                $set: { IDPermission: ids }
            },
            { new: true }
        );
    }
}
export default new roleService();