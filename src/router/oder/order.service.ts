import { Order, Product } from "../../database/models";
import { statusOrder } from "../../database/models/enum";

class oderService {
    _constructor() {
    }
//create oder follow supplier 
   async createOrder(orderData) {
      const productIDs = orderData.IDProducts;

      for (const productID of productIDs) {
          await Order.create({
              IDProduct: productID,
              IDCustomer: orderData.IDCustomer,
              orderDate: new Date(),
              statusOrder: statusOrder.PENDING,
              ShipAddress: orderData.ShipAddress,
              ShipPhone: orderData.ShipPhone,
          });
      }
    }

  async getOderById(id) {
        const oder = await Order.findById(id)
        .populate({path:'IDProduct',populate:{ path:'IDSupplier'}})
        .populate('IDCustomer')
        .populate('payment');
        return oder;
    }
  async payment(id) {
        const oder = await this.getOderById(id);
        console.log(oder);
        return oder;
    }  
   async getOderByUserId(userID) {
        return await Order.find({ IDCustomer: userID })
        .populate({ path: 'IDProduct' , populate:{ path:'IDSupplier'}})
        .populate('payment');
   }
   async getOderByIdSupplier(userID) {
        const product = await Product.find({ IDSupplier: userID });
        const productIDs = product.map((item) => item._id);
        return await Order.find({ IDProduct: { $in: productIDs } })
        .populate({ path: 'IDProduct' , populate:{ path:'IDSupplier'}})
        .populate('payment');  
   }
}
export default new oderService();