import userService from "./user.service";
class UserController {
    _constructor() {
    }
    async getUsers(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const users = await userService.getUsers( page, limit );
            res.status(200).json(users);
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
            res.status(200).json({ message: 'User updated successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    async getRoles(req, res, next) {
        res.status(200).json({ message: 'getRoles' });
    }
    async getPermissions(req, res, next) {
        try {
            const permissions = await userService.getPermissions();
            res.status(200).json(permissions);
        }catch(error)
        {
            next(error);
        }
    }
    async addPermissionForRole(req, res, next) {
        try {
            const roleID = req.params.id;
            const { body } = req.body;
            await userService.addPermissionForRole(roleID, body);
            res.status(200).json({ message: 'Permission added successfully' });
        } catch (error) {
            
        }
    }
}

export default new UserController();