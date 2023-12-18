import { User,Role,Account } from '../../database/models'
import { statusUser } from '../../database/models/enum'
import { mailService } from '../../service';
class UserService {
    _constructor() {
    }
    async getUsers(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const users = await User.find({deleted:false}).limit(limit).skip(skipCount).populate({path:'account Roles',select:'userName email roleName'});
            return users;
        } catch(error) {
            throw error;
        }
    }
    async updateUser(id, body) {
        try {

            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            user.set(body);
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({deleted:true});
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async getRoles(users: any[]) {
        try {
            const resultData: any[] = [];
    
            // Use Promise.all to map users to their corresponding roles
            await Promise.all(users.map(async (user) => {
                const role = await Role.findById({ _id: user.Roles, deleted: false });
                // Combine user and role data into a single object
                const userDataWithRole = {
                    user,
                    role,
                };
                resultData.push(userDataWithRole);
            }));
    
            return resultData;
        } catch (error) {
            throw error;
        }
    }
    async addRoleForUser(userID, roleId) {
        const user = await User.findById(userID);
        if (!user) { throw new Error('User not found'); }
        if (user.Roles.includes(roleId)) { 
            return ;
         }
        user.Roles.push(roleId);
        return await user.save();
    }
    async registerSellerService(userId) {
        try {
            const user = await User.findById({_id:userId,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({isActive: statusUser.REQUEST});
            await user.save();
        } catch (error) {
            throw error;
        }
    }
    async acceptSellerService(userIds) {
        try {
            const users = await User.find({
                _id: { $in: userIds },
                deleted: false
            }).populate('account');
            // console.log(users);
            
            for (const user of users) {
               
                
                // Populate the 'account' field to get the actual account object
                    const account = await Account.findById(user.account);
                    user.isActive = statusUser.ACCEPTED;
                    const role = await Role.findOne({ roleName: 'Seller' });
                    if (!role) { throw new Error('Role not found'); }
                    user.Roles = [role._id];
                    await user.save();
                    if (account === null) { throw new Error('Account not found'); }
                    const email = account.email;
                    const htmlTemplate = `
                    <p>Dear ${user.firstName} ${user.lastName},</p>
                    <p>Your request to become a seller has been accepted.</p>
                    <p>Click <a href="http://localhost:3000/api/supplier/form">here</a> to update supplier information.</p>
                    `;
            
                    await mailService.sendMail(email, 'Request to become a seller accepted', '', htmlTemplate);
                }
            return true;
        } catch (error) {
            throw error;
        }
    }
    
    
    async getSellerService(page?, limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const users = await User.find({isActive:statusUser.REQUEST,deleted:false}).populate('account').limit(limit).skip(skipCount);
            return users;
        } catch (error) {
            throw error;
        }
    }
    async getUserById(id) {
        return await User.findById(id).populate({path:'account Roles',select:'userName email roleName'});
    }
}
export default new UserService();