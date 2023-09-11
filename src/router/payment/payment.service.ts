import { paymentConfig } from '../../config';
import paypal from 'paypal-rest-sdk';

class PaymentService {

  async createPayment(name, price, sku, currency, quantity) {
    try {
      await paypal.configure(paymentConfig);

      const item = {
        name,
        sku,
        price,
        currency,
        quantity,
      };
      let total = (price * quantity).toFixed(2);
      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: 'http://localhost:3000/api/payment/confirm/success?total='+total,
          cancel_url: 'http://localhost:3000/payment/confirm/cancel',
        },
        transactions: [
          {
            item_list: {
              items: [item],
            },
            amount: {
              currency,
              total: total, // Calculate the total amount dynamically
            },
            description: 'Hat for the best team ever',
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
      console.error('PayPal API Error:', error);
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
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
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
                console.log("List Payments Response");
                console.log(JSON.stringify(payment));
                return payment;
            }
        });
    }

}

export default new PaymentService();
