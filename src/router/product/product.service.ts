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

    async getOneProduct(page, limit, ObjectID) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit;
            const productID =  ObjectID.id;
            const product = await Product.findById(productID).where({deleted: false}).limit(limit).skip(skipCount);
            return product;
        } catch(error) {
            throw error;
        }
    }

    async getProductsbyCategory(page, limit, ObjectID) {
        try {
            page ? page : null;
            limit ? limit : null;    
            const skipCount = (page - 1) * limit;
            const cateID =  ObjectID.CategoryID;
    
            const products = await Product.find({
                deleted: false,
                IDCategory: cateID 
            }).limit(limit).skip(skipCount);
    
            return products;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, body) {
        try {
            const product = await Product.findById(id).where({deleted: false});
            if(!product) throw new Error('Product not found');
            product.set(body);
            await product.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const product = await Product.findById(id).where({deleted: false});
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
    
    async addCategoryForProduct(idobject, changed_category) {
        try {
            const id =  idobject.id;
            const product = await Product.findById(id).where({deleted: false});
            if(!product) throw new Error('Product not found');

            const old_category = await Category.find({ IDProduct: id}); //tìm category của có chứa product lúc ban đầu 
            if(!old_category) throw new Error('Category not found');
            // loai bỏ product ra khỏi category ban đầu
            for (const category of old_category)
            {
                const sampleIndex = category.IDProduct.indexOf(id); 
                if (sampleIndex !== -1) {
                    category.IDProduct.splice(sampleIndex, 1);
                    await category.save();
                    console.log(`Đã loại bỏ sản phẩm khỏi danh mục: ${category.CategoryName}`);
                }
            }
            
            await product.set({IDCategory: changed_category});
            await product.save();

            const new_category = await Category.findById(product.IDCategory);

            if (new_category) {
                
                if (!new_category.IDProduct.includes(product._id)) {
                    new_category.IDProduct.push(product._id);
                    console.log(`Đã thêm sản phẩm vào danh mục: ${new_category.CategoryName}`);
                await new_category.save();
                }
            }

            return true;
        } catch (error) { 
            throw error;
        }
    }

    async addProduct(body) {
        try {
            const product = new Product(body);
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }

}
export default new ProductService();