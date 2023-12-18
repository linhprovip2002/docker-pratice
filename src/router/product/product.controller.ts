import productService from "./product.service";

class ProductController {
    async getProducts(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : 1;
            limit ? limit : 100;
            const products = await productService.getProducts(page, limit);
            console.log('tong product: ' + products.length);
            
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productService.getOneProduct(id);
            return res.status(200).json(product);
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

    async getDiscountByProductId(req, res, next) {
        try {
            const { id } = req.params;
            const discount = await productService.getDiscountByProductId(id);
            return res.status(200).json(discount);
        } catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            console.log("----------------");
            
            const userId = req.userToken.IDUser;
            const body = req.body;
            await productService.createProduct(userId, body);
            return res.status(200).json({ message: 'Product created successfully' });
        } catch (error) {
            next(error);
        }
    }
    async createRating(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const { id } = req.params;
            const body = req.body;
            console.log(userId, id, body);
            await productService.createRating(userId, id, body);
            return res.status(200).json({ message: 'Rating created successfully' });
        } catch (error) {
            next(error);
        }
    }
    async createComment(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const { id } = req.params;
            const body = req.body;
            const comment = await productService.createComment(userId, id, body);
            return res.status(200).json(comment);
        } catch (error) {
            next(error);
        }
    }
    async createReply(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const { commentId } = req.params;
            const body = req.body;
            const comment = await productService.createReply(userId, commentId, body);
            return res.status(200).json(comment);
        } catch (error) {
            next(error);
        }
    }
    async getCommentsByProductId(req, res, next) {
        try {
            const { id } = req.params;
            const comments = await productService.getCommentsByProductId(id);
            return res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }
    async updateComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const userId = req.userToken.IDUser;
            await productService.updateComment( userId, commentId, req.body);
            return res.status(200).json({ message: 'Comment updated successfully' });
            
        } catch (error) {
            next(error);
        }
    }
    async deleteComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const userId = req.userToken.IDUser; 
            await productService.deleteComment(userId, commentId);
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();