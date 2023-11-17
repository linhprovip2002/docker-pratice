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
    
            
            const role = await Role.findById({_id:roleID,deleted:false});
            if(!role) throw new Error('Role not found');
            role.IDPermission = [ids];
            await role.save();
        } catch (error) {
            throw error;
        }
    }
}
export default new roleService();