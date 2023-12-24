import { paymentService } from "./index";

class  PaymentController
{
    public async pay(req, res, next) {
        try {
            const { name, price } = req.body;
            const orderId = req.params.id;
            const payment = await paymentService.createPayment(name, price, orderId);
    
            if (payment instanceof Error) {
                return res.status(400).json({ message: payment.message });
            }
            return res.status(200).json(payment);
        } catch (err) {
            next(err);
        }
    }
    public async success(req, res, next){
        try {
            const { paymentId, PayerID, total, orderId } = req.query;
            await paymentService.updateOder(orderId);
            await paymentService.executePayment(paymentId, PayerID,total);
            console.log('http://localhost:3002/order-complete?orderId' + orderId);
            const redirectUrl = 'http://localhost:3002/order-complete?orderId=' + orderId + 'status=success';
            return res.writeHead(301, { Location: redirectUrl }).end();
        } catch (err) {
            next(err);
        }
    }
    public async cancel(req, res, next){
        try {
            const { orderId } = req.query;
            await paymentService.cancelPayment(orderId);
            const redirectUrl = 'http://localhost:3002/order-complete?orderId=' + orderId + 'status=cancel';
            return res.writeHead(301, { Location: redirectUrl }).end();
        } catch (err) {
            next(err);
        }
    }
    public async list(req, res, next){
        try {
            const payments = await paymentService.listPayments();
            return res.status(200).json({ payments });
        } catch (err) {
            next(err);
        }
    }
}

export default new PaymentController();