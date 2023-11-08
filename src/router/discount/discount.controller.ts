// import { Discount } from "../../database/models";
import discountService from "./discount.service";

class DiscountController {

    async createDiscount(req, res, next) {
        try {

            const { idProduct } = req.params;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await discountService.createDiscount(idProduct, body, userId);
            return res.status(200).json({ message: 'Discount added successfully' });
        } catch (error) {
            next(error);
        }
    }

    async updateDiscount(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await discountService.updateDiscount(id, body, userId);
            return res.status(200).json({ message: 'Discount updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteDiscount(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.IDUser;
            await discountService.deleteDiscount(id, userId);
            return res.status(200).json({ message: 'Discount deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new DiscountController();