import productService from "./product.service";

class ProductController {
    async getProducts(req, res, next) {
        try {
            const { page, limit } = req.query;
            const products = await productService.getProducts(page, limit);
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductsbyCategory(req, res, next) {
        try {
            const { page, limit, CategoryID } = req.query;
            const products = await productService.getProductsbyCategory(page, limit, CategoryID);
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            await productService.updateProduct(id, body);
            return res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            await productService.deleteProduct(id);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getCategorys(req, res, next) {
        try {
            const { page, limit } = req.query;
            const products = await productService.getProducts(page, limit);
            const resultData = await productService.getCategorys(products);
            return res.status(200).json(resultData);
        } catch (error) {
            next(error);
        }
    }

    async getDiscounts(req, res, next) {
        try {
            const { page, limit } = req.query;
            const products = await productService.getProducts(page, limit);
            const resultData = await productService.getDiscounts(products);
            return res.status(200).json(resultData);
        } catch (error) {
            next(error);
        }
    }

    async addCategoryForProduct(req, res, next) {
        try {
            const { productID, Categoryid } = req.body;
            await productService.addCategoryForProduct(productID, Categoryid);
            return res.status(200).json({ message: 'Category added to product successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
