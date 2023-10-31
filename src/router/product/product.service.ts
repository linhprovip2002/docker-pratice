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

    async getOneProduct(id) {
        try {
            const product = await Product.findById(id).where({deleted: false});
            return product;
        } catch(error) {
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
}
export default new ProductService();