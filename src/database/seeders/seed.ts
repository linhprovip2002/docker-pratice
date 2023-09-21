import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import { Permission, Role } from '../models'; 
// import * as dataSeed from '../seeders/migrations/permission.json';

const dataSeed = require('./migrations/permission.json'); 

async function seedData() {
    try {
  
      await dbConfig.connect();
      console.log('Connected to database successfully.');
      console.log(dataSeed);
    
      await Permission.insertMany(dataSeed);
  
 
      const allPermissions = await Permission.find({});
      const superUserPermissions = allPermissions.map((permission) => permission._id);
  
      const superUserRole = new Role({
        roleName: 'superUser',
        roleDescription: 'Super User Role',
        IDPermission: superUserPermissions,
      });
  
      await superUserRole.save();
      // const roleID = Role.findOne({roleName:'superUser'})
      console.log('Role "superUser" saved successfully.');

      console.log('Data seeding completed successfully.');
  
    
      await mongoose.disconnect();
    } catch (error) {
      console.error('Data seeding failed:', error);
      return process.exit(1);
    }
  }
  
  // Call the seedData function to start the seeding process
  seedData();