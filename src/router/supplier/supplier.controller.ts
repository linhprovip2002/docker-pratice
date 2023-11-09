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

}

export default new SupplierController();