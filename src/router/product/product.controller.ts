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
            const { body } = req.body;
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
    
}

export default new ProductController();