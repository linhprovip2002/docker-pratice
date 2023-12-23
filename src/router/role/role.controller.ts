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
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const permissions = await roleService.getPermissions( page, limit );

            
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
            if(ids.length ===0 ) {
                await roleService.addPermissionForRole(roleID, []);
            }
            await roleService.addPermissionForRole(roleID, ids);
            return res.status(200).json({ message: 'Permission added successfully' });
        } catch (error) {
            next(error);
        }
    }
    async removePermissionForRole(req, res, next) {
        try {
            const roleID = req.params.id;
            const { ids } = req.body;
            await roleService.removePermissionForRole(roleID, ids);
            return res.status(200).json({ message: 'Permission removed successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new roleController();