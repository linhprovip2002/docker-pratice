import { paymentConfig } from '../../database/config';
import { Order,Product } from '../../database/models';
import paypal from 'paypal-rest-sdk';
import { statusOrder } from '../../database/models/enum';
import { base_URL } from '../../constant';

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
          return_url: `${base_URL}/api/payment/confirm/success?total=${price}&orderId=${orderId}`,
          cancel_url: `${base_URL}/api/payment/confirm/cancel?orderId=${orderId}`,
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
          return  await Order.findByIdAndUpdate(
            { _id: oderId},
            {
                statusOrder: statusOrder.PAYMENT_SUCCESS,
                feedbackSupplier: 'Đơn hàng thanh toán thành công'
            },
            { new: true }
        );
    }
    async updateNumberSold(orderId) {
      try {
          // Use proper casing for variable names (orderId instead of oderId)
          const order = await Order.findOne({ _id: orderId, deleted: false, statusOrder: statusOrder.PAYMENT_SUCCESS });
  
          if (!order) {
              // Handle the case where the order is not found
              console.log("Order not found or not in the correct state");
              return;
          }
  
  
          const product = await Product.findOne({ _id: order.IDProduct[0], deleted: false });
  
          if (!product) {
              // Handle the case where the product is not found
              console.log("Product not found");
              return;
          }
  
          // Use findOneAndUpdate directly on the Product model
          const updatedProduct = await Product.findOneAndUpdate(
              { _id: order.IDProduct[0], deleted: false },
              {
                  $inc: { soldNumber: 1, quantity: -1 } // Use $inc to increment and decrement values
              },
              { new: true }
          );
  
          console.log("updatedProduct --------------> ", updatedProduct);
      } catch (error) {
          console.error("Error updating number sold:", error);
          // Handle the error as needed
      }
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
