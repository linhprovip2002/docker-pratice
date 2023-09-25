import { Account } from "../../database/models";

class AuthenticationController {
    constructor() {
    }
    async register(req, res, next) {
        try {
            const payload = req.body;
            
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error("Error while saving permission:", error);
            res.status(500).send("Error while saving permission.");
        }
    }
}
export default new AuthenticationController();