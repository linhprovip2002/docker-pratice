import { authenticateService } from "../router/authentication";

export default function checkAuthor(permission:string) {
    return async  function (req, res, next )
    {
        // const IDuser = req.userToken.id;
        const roles = req.userToken.roles;
        console.log(roles);
        const a = await authenticateService.findPermissionByRoles(roles)
        console.log(a);
        
        next();
    }
}