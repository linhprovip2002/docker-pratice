import { dbConfig } from "../config";
import { Product } from "../models"; // Adjust the import based on your actual model definition

async function main() {
  try {
    await dbConfig.connect();

    // Find products where soldNumber does not exist or is null
    const productsToUpdate = await Product.find({
      soldNumber: { $exists: false },
    });

    // Update each product to set soldNumber to 0
    const calls = productsToUpdate.map((product) =>
      Product.updateOne(
        { _id: product._id },
        { $set: { soldNumber: 0 } }
      )
    );

    await Promise.all(calls); // Wait for all update operations to complete

    console.log('Products updated successfully.');
    return;
  } catch (error) {
    console.error('Error updating products:', error);
  }
}

main();
