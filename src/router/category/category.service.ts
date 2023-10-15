import { Category, Stock, Discount } from '../../database/models'


class CategoryService {
    _constructor() {
    }
    async getCategorys(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const categorys = await Category.find({deleted:false}).limit(limit).skip(skipCount);
            return categorys;
        } catch(error) {
            throw error;
        }
    }

    async updateCategory(id, body) {
        try {
            const category = await Category.findById({id,deleted:false});
            if(!category) throw new Error('Category not found');
            category.set(body);
            await category.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteCategory(id) {
        try {
            const category = await Category.findById({id,deleted:false});
            if(!category) throw new Error('Category not found');
            await category.set({deleted:true});
            await category.save();
        } catch(error) {
            throw error;
        }
    }

}
export default new CategoryService();