import supplierService from "./supplier.service";

class SupplierController {
    async createSupplier(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const body = req.body;
            await supplierService.createSupplier(userId, body);
            return res.status(200).json({ message: 'Supplier added successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getAllSuppliers(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const suppliers = await supplierService.getAllSuppliers(page, limit);
            return res.status(200).json(suppliers);
        } catch (error) {
            next(error);
        }
    }

    async updateSupplier(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await supplierService.updateSupplier(id, body, userId);
            return res.status(200).json({ message: 'Supplier updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getDetail(req, res, next) {
        try {
            const id = req.params.id;
            const supplierDetail = await supplierService.getDetail(id);
            return res.status(200).json(supplierDetail);
        } catch (error) {
            next(error);
        }
    }

    async createStock(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const body = req.body;
            await supplierService.createStock(userId, body);
            return res.status(200).json({ message: 'Stock added successfully' });
        } catch (error) {
          next(error);
        }
    }

    async updateStock(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await supplierService.updateStock(id, body, userId);
            return res.status(200).json({ message: 'Supplier updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getMyStocks(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const stocks = await supplierService.getMyStocks(userId);
            return res.status(200).json(stocks);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByStockId(req, res, next) {
        try {
        const { id } = req.params;
        const userId = req.userToken.IDUser;
        const stockDetail = await supplierService.getProductsByStockId(id, userId);
        return res.status(200).json(stockDetail);

        } catch (error) {
            next(error);
        }
    }

    async deleteStock(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.IDUser;
            await supplierService.deleteStock(id, userId);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async createProductinStock(req, res, next) {
        try {
            const { id } = req.params; //id Stock
            const userId = req.userToken.IDUser;
            const body = req.body;
            await supplierService.createProductinStock(id, body, userId);
            return res.status(200).json({ message: 'Product added successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new SupplierController();