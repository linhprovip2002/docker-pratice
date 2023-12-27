import { paymentService } from "./index";
import moment from "moment";
// import config from "../../database/config/vnpay.config"
import { vnConfig } from "../../database/config";
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
            const redirectUrl = 'http://localhost:3002/checkout?orderId=' + orderId + 'status=failed';
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
    async vnpay(req, res, next){
        try {
            let order_id = req.query.order_id;
            process.env.TZ = 'Asia/Ho_Chi_Minh';
    
            let date = new Date();
            let createDate = moment(date).format('YYYYMMDDHHmmss');
            
            let ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            
            let tmnCode = vnConfig.vnp_TmnCode
            let secretKey = vnConfig.vnp_HashSecret;
            let vnpUrl = vnConfig.vnp_Url
            let returnUrl = vnConfig.vnp_ReturnUrl;
            let orderId = moment(date).format('DDHHmmss');
            let amount = req.body.amount;
            let bankCode = req.body.bankCode;
            
            let locale = req.body.language;
            if(locale === null || locale === ''){
                locale = 'vn';
            }
            let currCode = 'VND';
            let vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
            vnp_Params['vnp_OrderType'] = 'other';
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl +order_id;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;
            if(bankCode !== null && bankCode !== ''){
                vnp_Params['vnp_BankCode'] = bankCode;
            }
            vnp_Params = paymentService.sortObject(vnp_Params);
        
            let querystring = require('qs');
            let signData = querystring.stringify(vnp_Params, { encode: false });
            let crypto = require("crypto");     
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
            console.log('------------------vnpUrl ',vnpUrl);
            // return res.writeHead(301, { Location: vnpUrl }).end();
            return res.status(200).json({ vnpUrl });
            
        } catch (error) {
            next(error);
        }
    }
    async vnpayReturn(req, res, next){
        try {
            const { order_id , vnp_ResponseCode } = req.query;
            if(vnp_ResponseCode == '00'){
                await paymentService.updateOder(order_id);
                const redirectUrl = 'http://localhost:3002/order-complete?orderId=' + order_id + 'status=success';
                return res.writeHead(301, { Location: redirectUrl }).end();
            } else {
                await paymentService.cancelPayment(order_id);
                const redirectUrl = 'http://localhost:3002/checkout?orderId=' + order_id + 'status=failed';
                return res.writeHead(301, { Location: redirectUrl }).end();
            }
        } catch (error) {
            
        }
    }

}

export default new PaymentController();