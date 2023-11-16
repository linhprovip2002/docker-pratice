import { Category, Product } from '../../database/models'


class CategoryService {
    _constructor() {
    }

    async updateIDProductInAllCategory() {
        try {
            // Xóa toàn bộ giá trị trong trường IDProduct của tất cả các Category
            await Category.updateMany({}, { $set: { IDProduct: [] } });

            // Lấy danh sách tất cả các sản phẩm
            const allProducts = await Product.find({});

            // Duyệt qua từng sản phẩm
            for (const product of allProducts) {
                // Thêm product._id vào IDProduct
                await Category.updateOne(
                    { _id: product.IDCategory },  
                    { $addToSet: { IDProduct: product._id } }
                );
            }
    
            console.log('Update IDProduct in Category completed.');
        } catch (error) {
            console.error('Failed to update IDProduct in Category:', error);
        }
    }

    async getProductsByCategoryName(page, limit, slugstring) {
        try {
            await this.updateIDProductInAllCategory();
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

    async getCategorys() {
        try {
            await this.updateIDProductInAllCategory();
            const categorys = await Category.find({deleted:false}).populate('IDProduct');
            return categorys ;
        } catch(error) {
            throw error;
        }
    }
}
export default new CategoryService();