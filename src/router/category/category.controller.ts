import categoryService from "./category.service";

class CategoryController {
    async getCategorys(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const categorys = await categoryService.getCategorys(page, limit);
            return res.status(200).json(categorys);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            await categoryService.updateCategory(id, body);
            return res.status(200).json({ message: 'Category updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(id);
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();