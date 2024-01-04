import productService from "./product.service";

class ProductController {
    async getProducts(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : 1;
            limit ? limit : 100;
            const products = await productService.getProducts(page, limit);

            
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
    async createReview(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const body = req.body;
            const { id } = req.params 
            const review  = await productService.createReview(id, userId, body);
            return res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    }
    async readReview( req , res , next ) {
        try {
            const { id } = req.params 
            const review  = await productService.readReview(id);
            return res.status(200).json(review)
        } catch (error) {
            next(error)
        }
    }
    async updateReview(req , res , next ) {
       try {
        const userId = req.userToken.IDUser;
        console.log(userId)
        const body = req.body;
        const { id } = req.params;
        const review  = await productService.updateReview(id, userId, body);
        return res.status(200).json(review);
       } catch (error) {
        next(error)
       }
    }
    async deleteReview() {
        
    }
}

export default new ProductController();