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
}

export default new CategoryController();