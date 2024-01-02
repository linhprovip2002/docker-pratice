import { Account,User,Role,Permission } from "../../database/models";
import { hashPassword, hashPasswordSalt, signJwt } from "../../service";
import { mailService } from "../../service";
import mongoose from "mongoose";
import crypto from 'crypto';
class AuthenticationService {
    constructor() {

    }
    async register(userName, password, email) {
        try {
            const ObjectPassword:any = hashPassword(password);
            const account = new Account({
                userName,
                password: ObjectPassword.passwordHashed,
                email,
                salt: ObjectPassword.salt,
                passwordResetToken: crypto.randomBytes(20).toString('hex')
            });
            await account.save();
            const roleUser = await Role.findOne({ roleName: "User",deleted: false });
            const user = new User({
                account: account,
                Roles: roleUser
            });
            await user.save();
            
        } catch (error) {
            throw error;
        }

    }
    async login(account, password) {
        try {
            const hashPasswordUser = hashPasswordSalt(account.salt, password);
            if(hashPasswordUser !== account.password)
            {
                throw new Error("Password incorrect");
            }
            const user = await User.findOne({ account: account._id,deleted: false }).populate({path:'account Roles',select:'email userName roleName'})
            const token = signJwt(user,account.email);
            return {token,user};
        }catch(error)
        {
            throw error;
        }
    }
    async findAccountByUserName(username)
    {
        try {
            const account = await Account.findOne({ userName:username,deleted: false });
            return account;
        } catch (error) {
            throw error;
        }
    }
    async forgotPassword(account)
    {
        const htmlTemplate = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
        
                h1 {
                    color: #007BFF;
                    margin-bottom: 20px;
                }
        
                h2 {
                    font-size: 18px;
                    color: #333;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <h1>Forgot Password</h1>
            <h2>${account.passwordResetToken}</h2>
        </body>
        </html>
        `;
        try {
            mailService.sendMail(account.email, "Forgot Password", "", htmlTemplate);
        }
        catch(error)
        {
            throw error;
        }
    }
    async resetPassword(tokenResetPassword, password)
    {
        try {
            const account = await Account.findOne({ passwordResetToken: tokenResetPassword,deleted: false });
            if(!account)
            {
                throw new Error("Token is invalid");
            }
            const hashPasswordUser = hashPasswordSalt(account.salt, password);
            await account.updateOne({ password: hashPasswordUser, passwordResetToken: crypto.randomBytes(20).toString('hex') });
        }
        catch(error)
        {
            throw error;
        }
    }
    async findAccountByEmail(email)
    {
        try {
            const account = await Account.findOne({ email,deleted: false });
            return account;
        }
        catch(error)
        {
            throw error;
        }
    }
    async findPermissionByRoles(roles: string[]) {
        try {
            const permissions = await Role.find({ _id: { $in: roles }, deleted: false });
    
            // Create an array to store permission IDs
            const permissionIDs: mongoose.Types.ObjectId[] = [];
            for (const role of permissions) {
                // Iterate through the permissions associated with each role
                for (const permissionID of role.IDPermission) {
                    permissionIDs.push(permissionID);
                }
            }
    
            // console.log("Permission IDs: " + permissionIDs);
            
            return permissionIDs;
        } catch (error) {
            throw error;
        }
    }
    async findNamePermissionById(ids)
    {
        try{
            const permissions = await Permission.find({ _id: { $in: ids },deleted: false });
            return permissions.map(permission => permission.title);

        }catch(error)
        {   
            throw error;
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        try {
            // Find the user by userId and populate the account information
            const user:any = await User.findOne({ _id: userId, deleted: false }).populate({ path: 'account', select: 'password salt' });
    
            if (!user) {
                throw new Error("User not found");
            }
    
            // Verify old password
            const hashPasswordUser = hashPasswordSalt(user.account.salt, oldPassword);
            if (hashPasswordUser !== user.account.password) {
                throw new Error("Old password incorrect");
            }
    
            // Find the account by id
            const account = await Account.findOne({ _id: user.account._id, deleted: false });
            if (!account) {
                throw new Error("Account not found");
            }
    
            // Update the account with the new password
            const newPasswordHash:any = hashPassword(newPassword);
            await Account.findOneAndUpdate({ _id: account._id }, { password: newPasswordHash.passwordHashed, salt: newPasswordHash.salt });
    
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    }
    
}

export default new AuthenticationService();