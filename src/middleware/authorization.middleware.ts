import { authenticateService } from "../router/authentication";
export default function checkAuthor(permission:string) {
    return async  function (req, res, next )
    {  
        try {
            console.log("checkAuthor");
            
            const roles = req.userToken.roles;
            const permissionsIds = await authenticateService.findPermissionByRoles(roles);
            const permissionsTile = await authenticateService.findNamePermissionById(permissionsIds);
            let mySet = new Set(permissionsTile);
            
            if( !mySet.has(permission))
            {
                return res.status(401).json({ message: 'You not allow access this feature' });
            }
            next();
        }  catch(error) {
            next(error);
        }
    }
}