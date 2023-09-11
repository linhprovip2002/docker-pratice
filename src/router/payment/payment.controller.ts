import { paymentService } from "./index";

class  PaymentController
{
    public async pay(req, res, next): Promise<any> {
        try {
            const { name, price,sku,currency,quantity } = req.body;
            const payment = await paymentService.createPayment(name, price,sku,currency,quantity);
            console.log(payment);
            return res.status(200).json({ payment });
        } catch (err) { 
            next(err);
        }
        
    }
    public async success(req, res, next): Promise<any> {
        try {
            const { paymentId, PayerID, total } = req.query;
            const payment = await paymentService.executePayment(paymentId, PayerID,total);
            return res.status(200).json({ payment });
        } catch (err) {
            next(err);
        }
    }
    public async cancel(req, res, next): Promise<any> {
        try {
            return res.status(200).json({ message: 'Payment cancelled' });
        } catch (err) {
            next(err);
        }
    }
    public async list(req, res, next): Promise<any> {
        try {
            const payments = await paymentService.listPayments();
            return res.status(200).json({ payments });
        } catch (err) {
            next(err);
        }
    }
}

export default new PaymentController();