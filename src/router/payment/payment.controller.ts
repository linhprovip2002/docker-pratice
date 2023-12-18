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
            return res.status(200).json({ message: "payment success" });
        } catch (err) {
            next(err);
        }
    }
    public async cancel(req, res, next){
        try {
            const { orderId } = req.query;
            await paymentService.cancelPayment(orderId);
            return res.status(200).json({ message: 'Payment cancelled' });
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