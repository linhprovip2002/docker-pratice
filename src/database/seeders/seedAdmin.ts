import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import { Account, User, Role } from '../models';
const userDataSeed = require( './migrations/user.json');

async function seedData() {
    try {
        await dbConfig.connect();

        await User.insertMany(userDataSeed);
        console.log('User seeding completed successfully.');

        const supperUser = await User.findOne({ firstName: 'Super', lastName: 'Admin' }); // Use findOne to get a single user
        if (!supperUser) {
            console.error('Super user not found.');
            return process.exit(1);
        }

        const role = await Role.findOne({ roleName: 'superUser' });
        if (!role) {
            console.error('Role not found.');
            return process.exit(1);
        }

        // Assign the role to the user
        supperUser.Roles.push(role._id); // Assuming 'Roles' is an array field in your User model
        await supperUser.save();

        const superAccount = new Account({
            IDUser: supperUser._id,
            userName: 'admin',
            password: 'admin',
            email: 'admin@gmail.com',
            salt: 'jaslkdjaksdjsiadjoqwdlks',
            passwordResetToken: 'asdasdasdasd',
        });
        await superAccount.save();

    } catch (error) {
        console.error('Data seeding failed:', error);
        return process.exit(1);
    } finally {
        await mongoose.disconnect();
    }

    console.log('Data user and account seeding completed successfully.');
}

seedData();
