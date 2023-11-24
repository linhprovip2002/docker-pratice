import categoryService from "./category.service";

class CategoryController {

    async getProductsByCategoryName(req, res, next) {
        try {
            const { page, limit} = req.query;
            page ? page : null;
            limit ? limit : null;
            const slugstring = req.params.slug;
            const products = await categoryService.getProductsByCategoryName(page, limit, slugstring);
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await categoryService.getCategories();
            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
    async getCategoryById(req, res, next) {
        try {
            console.log("vao day neneee");
            
            const id = req.params.id;
            const category =await categoryService.getCategoryById(id);
            return res.status(200).json(category);

        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();