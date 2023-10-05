import authenticateService from "./authenticate.service";
class AuthenticationController {
    constructor() {
    }
    async register(req, res, next) {
        try {
            const { username, password, email } = req.body;
            await authenticateService.register(username, password, email)
            return res.status(200).json("Register successfully.");
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error("Error while saving permission:", error);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const account = await authenticateService.findAccountByUserName(username);
            account?console.log("user found"):console.log("user not found");
            if(!account)
            {
                return res.status(401).send("User not found");
            }
            const token = await authenticateService.login(account, password);
            res.status(200).json({'token': token });
        } catch (error) {
            next(error);
          }
    }

}
export default new AuthenticationController();