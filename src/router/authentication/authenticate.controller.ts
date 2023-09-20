import { Permission } from "../../database/models";

class AuthenticationController {
    constructor() {
    }
    async register(req, res, next) {
        try {
            const permission = new Permission(); // Create a new Permission instance with request body data
            permission.title = req.body.title; // Set permission title
            permission.description = req.body.description; // Set permission description
            await permission.save(); // Save the permission to the database
            console.log(permission);
            res.send("Permission saved successfully.");
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error("Error while saving permission:", error);
            res.status(500).send("Error while saving permission.");
        }
    }
}
export default new AuthenticationController();