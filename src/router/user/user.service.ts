import { User,Role,Permission } from '../../database/models'


class UserService {
    _constructor() {
    }
    async getUsers(page? , limit?) {
        try {
            const users = await User.find({deleted:false}).limit(limit).skip(page);
            return users;
        } catch(error) {
            throw error;
        }
    }
    async updateUser(id, body) {
        try {
            const user = await User.findById({id,deleted:false});
            if(!user) throw new Error('User not found');
            user.set(body);
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const user = await User.findById({id,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({deleted:true});
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async getRoles() {
        try {
            const roles = await Role.find({deleted:false});
            return roles;
        } catch(error) {
            throw error;
        }
    }
    async getPermissions() {
        try {
            const permissions = await Permission.find({deleted:false});
            return permissions;
            
        } catch (error) {
            throw error;
        }
    }
    async addPermissionForRole(roleID, body) {
        try {
            const role = await Role.findById({roleID,deleted:false});
            if(!role) throw new Error('Role not found');
            console.log("here is body",body);
            role.set(body);
            await role.save();
        } catch (error) {
            throw error;
        }
    }
}
export default new UserService();