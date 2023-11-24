import { Category } from '../../database/models'


class CategoryService {
    _constructor() {
    }

    async getProductsByCategoryName(page, limit, slugstring) {
        try {
            const category = await Category.findOne({ slug: slugstring }).populate({
                path: 'IDProduct',
                match: { deleted: false }
            });
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

    async getCategories() {
        try {
            const categories = await Category.find({ deleted: false })
                .populate({
                    path: 'IDProduct',
                    match: { deleted: false },
                    populate: { path: 'IDSupplier' }
                });
    
            return categories;
        } catch (error) {
            throw error;
        }
    }
    async getCategoryById(id) {
        const category = await Category.findById({_id:id,deleted:false})
        .populate({
            path: 'IDProduct',
            match: { deleted: false },
            populate: { path: 'IDSupplier' }
        });
        console.log(category);
        
        return category;
    }
}
export default new CategoryService();