import { Account,User,Role } from "../../database/models";
import { hashPassword, hashPasswordSalt, signJwt } from "../../service";
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
                salt: ObjectPassword.salt
            });
            await account.save();
            const roleUser = await Role.findOne({ roleName: "User" });
            const accountA = await Account.findOne({ userName });
            console.log(accountA);
            console.log(roleUser);
            const user = new User({
                account: accountA,
                Roles: roleUser
            });
            console.log(" day la user " + user);
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
            const user = await User.findOne({ account: account._id });
            console.log("hahahahaha" + user);
            const token = signJwt(user,account.email);
            return token;
        }catch(error)
        {
            throw error;
        }
    }
    async findAccountByUserName(username)
    {
        try {
            const account = await Account.findOne({ userName:username });
            return account;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthenticationService();