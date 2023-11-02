import productService from "./product.service";

class ProductController {
    async getProducts(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const products = await productService.getProducts(page, limit);
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const id = req.params.id;
            const theproduct = await productService.getOneProduct(id);
            return res.status(200).json(theproduct);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await productService.updateProduct(id, body, userId);
            return res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.IDUser;
            await productService.deleteProduct(id, userId);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
    
    async getReviewByProductId(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const { id } = req.params;
            const reviews = await productService.getReviewByProductId(page, limit, id);
            return res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    }

    async createReview(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const { id } = req.params;
            const body = req.body;
            await productService.createReview(id, userId, body);
            return res.status(200).json({ message: 'Review created successfully' });
        } catch (error) {
            next(error);
        }
    }

    async updateReview(req, res, next) {
        try {
            const { id, idReview } = req.params;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await productService.updateReview(id, idReview, body, userId);
            return res.status(200).json({ message: 'Review updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getDiscountByProductId(req, res, next) {
        try {
            const { id } = req.params;
            const discount = await productService.getDiscountByProductId(id);
            return res.status(200).json(discount);
        } catch (error) {
            next(error);
        }
    }

}

export default new ProductController();