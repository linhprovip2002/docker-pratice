import { Product, Category, Stock, Discount } from '../../database/models'


class ProductService {
    _constructor() {
    }
    async getProducts(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const products = await Product.find({deleted:false}).limit(limit).skip(skipCount);
            return products;
        } catch(error) {
            throw error;
        }
    }

    async getProductsbyCategory(page, limit, CategoryID) {
        try {
            page ? page : null;
            limit ? limit : null;    
            const skipCount = (page - 1) * limit;
    
            const products = await Product.find({
                deleted: false,
                IDCategory: CategoryID // Lọc theo CategoryID
            }).limit(limit).skip(skipCount);
    
            return products;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, body) {
        try {
            const product = await Product.findById({id,deleted:false});
            if(!product) throw new Error('Product not found');
            product.set(body);
            await product.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const product = await Product.findById({id,deleted:false});
            if(!product) throw new Error('Product not found');
            await product.set({deleted:true});
            await product.save();
        } catch(error) {
            throw error;
        }
    }
    async getCategorys(products: any[]) {
        try {
            const resultData: any[] = [];
    
            // Use Promise.all to map products to their corresponding roles
            await Promise.all(products.map(async (product) => {
                console.log("here is product category", product.IDCategory);
                const category = await Category.findById({ _id: product.IDCategory, deleted: false });
                // Combine product and role data into a single object
                const productDataWithCategory = {
                    product,
                    category,
                };
                resultData.push(productDataWithCategory);
            }));
    
            return resultData;
        } catch (error) {
            throw error;
        }
    }

    async getDiscounts(products: any[]) {
        try {
            const resultData: any[] = [];

            await Promise.all(products.map(async (product) => {
                // Find the stock for the product to get the supplierID
                const stock = await Stock.findOne({ IDProduct: product._id, deleted: false });

                if (stock) {
                    // Find the discount for the product based on IDproduct and supplierID
                    const discount = await Discount.findOne({
                        IDproduct: product._id,
                        IDSupplier: stock.supplierID,
                        deleted: false
                    });

                    if (discount) {
                        // Calculate the new price after applying the discount
                        const originalPrice = parseFloat(product.price);
                        const discountAmount = originalPrice * (discount.discount / 100);
                        const newPrice = originalPrice - discountAmount;

                        // Combine product, discount, and new price data into a single object
                        const productDataWithDiscount = {
                            product,
                            discount,
                            newPrice,
                        };

                        resultData.push(productDataWithDiscount);
                    }
                }
            }));

            return resultData;
        } catch (error) {
            throw error;
        }
    }
    
    async addCategoryForProduct(productID, Categoryid) {
        try {
            const product = await Product.findById({productID,deleted:false});
            if(!product) throw new Error('Product not found');
            product.updateOne({IDCategory: Categoryid});
            return true;
        } catch (error) { 
            throw error;
        }
    }

}
export default new ProductService();