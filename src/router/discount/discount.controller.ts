import { Discount } from "../../database/models";
import discountService from "./discount.service";

class DiscountController {

    async createDiscount(req, res, next) {
        try {

            const { idProduct } = req.params;
            const body = req.body;
            await discountService.createDiscount(idProduct, body);
            return res.status(200).json({ message: 'Discount added successfully' });
        } catch (error) {
            next(error);
        }
    }

    async updateDiscount(req, res, next) {
        try {
            const { id } = req.params;
            const body = req.body;
            await discountService.updateDiscount(id, body);
            return res.status(200).json({ message: 'Discount updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteDiscount(req, res, next) {
        try {
            const { id } = req.params;
            await discountService.deleteDiscount(id);
            return res.status(200).json({ message: 'Discount deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new DiscountController();