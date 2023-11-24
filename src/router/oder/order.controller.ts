// import { oder } from "../../database/models";
import { orderService } from "./index";

class oderController {
     constructor() {
     }
        async createOder(req, res, next) {
            try {
                const { body } = req;
                const oder = await orderService.createOrder(body);
                return res.status(200).json({ data: oder });
            } catch (error) {
                next(error);
            }
        }
        async getOderById(req, res, next) {
            try {
                const { id } = req.params;
                const oder = await orderService.getOderById(id);
                return res.status(200).json({ data: oder });
            } catch (error) {
                next(error);
            }
        }

        async payment(req, res, next) {
            try {
                const { id } = req.params;
                const oder = await orderService.payment(id);
                return res.status(200).json({ data: oder });
            } catch (error) {
                next(error);
            }
        }
        async getOderByUserId(req, res, next) {
            try {
                const userID = req.userToken.IDuser;
                const oder = await orderService.getOderByUserId(userID);
                return res.status(200).json({ data: oder });
            } catch (error) {
                next(error);
            }
        }
        async getOderByIdSupplier(req, res, next) {
            try {
                const userID = req.userToken.IDuser;
                const oderList = await orderService.getOderByIdSupplier(userID);
                return res.status(200).json({ data: oderList });
            } catch (error) {
                next(error);
            }
        }

}

export default new oderController();