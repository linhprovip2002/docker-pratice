import { Category, Product } from '../../database/models'


class CategoryService {
    _constructor() {
    }

    async getProductsByCategoryName(page, limit, slugstring) {
        try {
            page ? page : null;
            limit ? limit : null;    
            const skipCount = (page - 1) * limit;
    
            const category = await Category.findOne({ slug: slugstring });
            if (!category) {
                throw new Error('Category not found');
            }
            
            // Lấy danh sách ID của các sản phẩm thuộc category
            const productIds = category.IDProduct;
            const products = await Product.find({ IDCategory: { $in: productIds } }).limit(limit).skip(skipCount);

            return products;
        } catch (error) {
            throw error;
        }
    }
}
export default new CategoryService();