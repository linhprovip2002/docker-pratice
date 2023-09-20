import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import { Permission, Role, User } from '../models'; 

const dataSeed = require('../seeders/migrations/permission.json'); 

async function seedData() {
    try {
  
      await dbConfig.connect();
  
    
      await Permission.insertMany(dataSeed);
  
 
      const allPermissions = await Permission.find({});
      const superUserPermissions = allPermissions.map((permission) => permission._id);
  
      const superUserRole = new Role({
        roleName: 'superUser',
        roleDescription: 'Super User Role',
        IDPermission: superUserPermissions,
      });
  
      await superUserRole.save();
      const roleID = Role.findOne({roleName:'superUser'})
      console.log('Role "superUser" saved successfully.');
      const user = new User(
        {
            Roles:roleID,
            firstName:"Admin",
            lastName:"Super",
            gender:"male",
            phone: 10000000000,
            dayOfBirth: 2002-9-19,
            lastLogin: Date.now(),
        }
      )
      await user.save();
      


      console.log('Data seeding completed successfully.');
  
    
      await mongoose.disconnect();
    } catch (error) {
      console.error('Data seeding failed:', error);
    }
  }
  
  // Call the seedData function to start the seeding process
  seedData();