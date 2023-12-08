import { orderService } from "./index";

class oderController {
     constructor() {
     }
        async createOder(req, res, next) {
            try {
                const { body } = req;
                console.log("body: " + body);
                
                const userID = req.userToken.IDUser;
                console.log("userID: " + userID );
                
                await orderService.createOrder(body,userID);
                return res.status(200).json({ message: 'Create order successfully' });
            } catch (error) {
                next(error);
            }
        }
        async getOderById(req, res, next) {
            try {
                const { id } = req.params;
                const oder = await orderService.getOderById(id);
                return res.status(200).json(oder);
            } catch (error) {
                next(error);
            }
        }

        async payment(req, res, next) {
            try {
                const { id } = req.params;
                const oder = await orderService.payment(id);
                return res.status(200).json(oder);
            } catch (error) {
                next(error);
            }
        }
        async getOderByUserId(req, res, next) {
            try {
                console.log("ngu vai ca cuc");
                
                const userID = req.userToken.IDUser;
                const oder = await orderService.getOderByUserId(userID);
                return res.status(200).json(oder);
            } catch (error) {
                next(error);
            }
        }
        async getOderByIdSupplier(req, res, next) {
            try {
                const userID = req.userToken.IDUser;
                const oderList = await orderService.getOderByIdSupplier(userID);
                return res.status(200).json(oderList);
            } catch (error) {
                next(error);
            }
        }
        async deleteOder(req, res, next) {
            try {
                console.log("here is deleteOder");
                const { id } = req.params;
                const userID = req.userToken.IDUser;
                console.log("userID: " + id);
                
                await orderService.deleteOder(id,userID);
                return res.status(200).json({ message: 'Delete order successfully' });
            } catch (error) {
                next(error);
            }
        }
        async updateOrder(req, res, next) {
            try {
                const { id } = req.params;
                const { body } = req;
                const userID = req.userToken.IDUser;
                await orderService.updateOrder(id, body,userID );
                return res.status(200).json({ message: 'Update order successfully' });
            } catch (error) {
                next(error);
            }
        }
}

export default new oderController();