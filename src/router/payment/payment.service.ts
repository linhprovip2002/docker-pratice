import { paymentConfig } from '../../database/config';
import { Order } from '../../database/models';
import paypal from 'paypal-rest-sdk';
import { statusOrder } from '../../database/models/enum';

class PaymentService {

  async checkOrderAccepted(id) {
    try {
      const order = await Order.findById({ _id: id, deleted: false });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.statusOrder === statusOrder.ACCEPTED) {
        return true;
      }

      if (order.statusOrder === statusOrder.PAYMENT_SUCCESS) {
        throw new Error('Order already paid');
      }

      throw new Error('Order not accepted');
    } catch (error) {
      throw error;
    }
  }

  async createPayment(name, price, orderId) {
    try {
      if (!(await this.checkOrderAccepted(orderId))) {
        return false;
      }

      const currency = 'USD';
      const quantity = 1;
      await paypal.configure(paymentConfig);

      const item = {
        name,
        price,
        currency,
        quantity,
      };

      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: `http://localhost:3000/api/payment/confirm/success?total=${price}&orderId=${orderId}`,
          cancel_url: `http://localhost:3000/api/payment/confirm/cancel?orderId=${orderId}`,
        },
        transactions: [
          {
            item_list: {
              items: [item],
            },
            amount: {
              currency,
              total: price.toString(),
            },
            description: `Payment for ${name}`,
          },
        ],
      };

      const payment = await new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });

      return payment;
    } catch (error) {
      throw error;
    }
  }
  async executePayment(paymentId, payerId,total) {
    // await paypal.configure(paymentConfig);
    const execute_payment_json = {
        payer_id: payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toString()
            }
        }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
        
                throw error;
            } else {
    
                return payment;
            }
        });
    }
    async listPayments() {
        let listPayment = {
            'count': '1',
            'start_index': '1'
        };
        paypal.payment.list(listPayment, function (error, payment) {
            if (error) {
                throw error;
            } else {
                return payment;
            }
        });
    }
    async updateOder(oderId) {  
        await Order.findByIdAndUpdate(
            { _id: oderId},
            {
                statusOrder: statusOrder.PAYMENT_SUCCESS,
                feedbackSupplier: 'Đơn hàng thanh toán thành công'
            },
            { new: true }
        );
    }
    async cancelPayment(oderId) {
      return await Order.findByIdAndUpdate(
          { _id: oderId},
          {
              statusOrder: statusOrder.PAYMENT_FAIL,
              feedbackSupplier: 'Đơn hàng thanh toán thất bại'
          },
          { new: true }
      );
    }
    sortObject(obj) {
      let sorted:any = {};
      let str:any = [];
      let key:any;
      for (key in obj){
          if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key));
          }
      }
      str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }
}

export default new PaymentService();
