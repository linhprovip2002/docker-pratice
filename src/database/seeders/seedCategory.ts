import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import {  Category, Product } from '../models';

const dataSeed = require('./migrations/category.json');

async function seedData() {
  try {
    await dbConfig.connect();
    console.log('Connected to the database successfully.');

    // Xóa tất cả dữ liệu cũ của model Category
    //await Category.deleteMany({});
    //await Product.deleteMany({});

    const existingCategorys = await Category.find({ categoryName: { $in: dataSeed.map(category => category.CategoryName) } });
    const newCategorys = dataSeed.filter(category => !existingCategorys.some(existing => existing.CategoryName === category.CategoryName));

    if (newCategorys.length > 0) {
      await Category.insertMany(newCategorys);
      console.log(`${newCategorys.length} new categorys inserted.`);
    } else {
      console.log('No new categorys to insert.');
    }

    console.log('Data seeding completed successfully.');
  } catch (error) {
    console.error('Data seeding failed:', error);
  } finally {
    await mongoose.disconnect(); // Close the database connection in both success and error cases
    console.log('Disconnected from the database.');
  }
}

// Call the seedData function to start the seeding process
seedData();