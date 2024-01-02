import { dbConfig } from "../config";
import { Product } from "../models";

async function main() {
  try {
    await dbConfig.connect();
    const products = await Product.find({});
    
    const calls:any = [];
    for (const product of products) {
      if (!product.soldNumber) {
        calls.push( Product.updateOne({ _id: product._id }, { soldNumber: 0 }));
      }
    }
    console.log(products);
    
    await Promise.all(calls);

    console.log('Products updated successfully.');
    return;
  } catch (error) {
    console.error('Error updating products:', error);
  }
}

main();
