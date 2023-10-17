import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import { Category, Product } from '../models';

const dataSeed = require('./migrations/product.json');

async function seedData() {
  try {
    await dbConfig.connect();
    console.log('Connected to the database successfully.');

    const existingProducts = await Product.find({ productName: { $in: dataSeed.map(product => product.nameProduct) } });
    const newProducts = dataSeed.filter(product => !existingProducts.some(existing => existing.nameProduct === product.nameProduct));

    if (newProducts.length > 0) {
      await Product.insertMany(newProducts);
      console.log(`${newProducts.length} new products inserted.`);
    } else {
      console.log('No new products to insert.');
    }

    //Update the `IDProduct` field in the `Category` collection to include the newly inserted products
    const allProducts = await Product.find({});

    // Duyệt qua từng sản phẩm
    for (const product of allProducts) {
      const category = await Category.findById(product.IDCategory);

      // Kiểm tra xem danh mục có tồn tại không
      if (category) {
        // Kiểm tra xem sản phẩm đã được thêm vào danh mục chưa
        if (!category.IDProduct.includes(product._id)) {
          category.IDProduct.push(product._id);
          await category.save();
        }
      }
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