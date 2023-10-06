import { User } from '../../database/models'

class UserService {
    _constructor() {
    }
    async getUsers(page? , limit?) {
        try {
            const users = await User.find({deleted:false}).limit(limit).skip(page);
            return users;
        } catch(error) {
            throw error;
        }
    }
    async updateUser(id, body) {
        try {
            const user = await User.findById({id,deleted:false});
            if(!user) throw new Error('User not found');
            user.set(body);
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const user = await User.findById({id,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({deleted:true});
            await user.save();
        } catch(error) {
            throw error;
        }
    }
}
export default new UserService();