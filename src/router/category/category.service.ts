import { Category } from '../../database/models'


class CategoryService {
    _constructor() {
    }

    async getProductsByCategoryName(page, limit, slugstring) {
        try {
            const category = await Category.findOne({ slug: slugstring }).populate('IDProduct');
            if (!category) {
                throw new Error('Category not found');
            }
            
            // Lấy danh sách ID của các sản phẩm thuộc category
            const products = category.IDProduct;
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getCategorys() {
        try {
            const categorys = await Category.find({deleted:false});
            return categorys ;
        } catch(error) {
            throw error;
        }
    }
}
export default new CategoryService();