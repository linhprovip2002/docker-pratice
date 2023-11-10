import { roleService } from "./index";

class roleController {
    async getRoles(req, res, next) {
        try {
            const roles = await roleService.getAllRoles();
            return res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }
    async getPermissions(req, res, next) {
        try {
            console.log("here is getPermissions");
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const permissions = await roleService.getPermissions( page, limit );
            console.log(permissions.length);
            
            return res.status(200).json(permissions);
        }catch(error)
        {
            next(error);
        }
    }
    async addPermissionForRole(req, res, next) {
        try {
            const roleID = req.params.id;
            const { ids } = req.body;
            console.log("roleID: " + ids);
            
            await roleService.addPermissionForRole(roleID, ids);
            return res.status(200).json({ message: 'Permission added successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new roleController();