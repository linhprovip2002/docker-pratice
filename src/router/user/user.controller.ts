import userService from "./user.service";
// import { authenticateService } from "../authentication";
class UserController {
    _constructor() {
    }
    async getUsers(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const users = await userService.getUsers( page, limit );
            return res.status(200).json(users);
        }catch(error)
        {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            
            const { body } = req;
            
            const user = await userService.updateUser(id, body);
            return res.status(200).json({ message: 'User updated successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            return res.status(200).json({ message: 'User deleted successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    // async getRoles(req, res, next) {
    //     const roles = await userService.getAllRoles();
    //     return res.status(200).json({ message: 'getRoles', roles: roles });
    // }
    // async getPermissions(req, res, next) {
    //     try {
    //         console.log("here is getPermissions");
    //         const { page, limit } = req.query;
    //         page ? page : null;
    //         limit ? limit : null;
    //         const permissions = await userService.getPermissions( page, limit );
    //         console.log(permissions.length);
            
    //         return res.status(200).json(permissions);
    //     }catch(error)
    //     {
    //         next(error);
    //     }
    // }
    // async addPermissionForRole(req, res, next) {
    //     try {
    //         const roleID = req.params.id;
    //         const { body } = req.body;
    //         await userService.addPermissionForRole(roleID, body);
    //         return res.status(200).json({ message: 'Permission added successfully' });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    async addRoleForUser(req, res, next) {
        try {
            const userID = req.params.id;
            const roleIds = req.body.roleIds;
            if ( !roleIds || roleIds.length === 0 ) {
                await userService.addRoleForUser(userID, []);
                return res.status(200).json({ message: 'Role removed successfully' });
            }
            const result = await userService.addRoleForUser(userID, roleIds);
            if( result instanceof  Error ) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json({ message: 'Role added successfully' });
        } catch (error) {
            next(error);   
        }
    }
    async registerSellerService(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            userService.registerSellerService(userId);
            
            return res.status(200).json({ message: 'Register seller service successfully' });
        } catch(error) {
            next(error);
        }
    }
    async acceptSellerService(req, res, next) {
        try {
            const { ids } = req.body;
            
            await userService.acceptSellerService(ids);
            return res.status(200).json({ message: 'Accept seller service successfully' });
        } catch (error) {
            next(error);
        }
    }
    async getSellerService(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const users = await userService.getSellerService( page, limit );
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {    
            const { id } = req.params;
            const user = await userService.getUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    async getInforMe(req, res, next) {
        try {
            const user = await userService.getUserById(req.userToken.IDUser);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();