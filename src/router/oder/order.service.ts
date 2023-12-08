import { Order, Product, Supplier } from "../../database/models";
import { statusOrder } from "../../database/models/enum";

class oderService {
    _constructor() {
    }
//create oder follow supplier 
   async createOrder(orderData, userID) {
      const productIDs = orderData.IDProducts; 
    //   console.log('productIDs: ' + productIDs);

      for (const productID of productIDs) {
          await Order.create({
              IDProduct: productID,
              IDCustomer: userID,
              orderDate: new Date(),
              statusOrder: statusOrder.PENDING,
              ShipAddress: orderData.ShipAddress,
              ShipPhone: orderData.ShipPhone,
          });
      }
    }

//   async getOderById(id) {
//         const oder = await Order.findById(id)
//         .populate({path:'IDProduct',populate:{ path:'IDSupplier IDCategory' select: 'companyName contactEmail contactPhone address logoImage CategoryName '} })
//         .populate('IDCustomer')
//         .populate('payment');
//         return oder;
//     }
    async getOderById(id) {
        try {
            const order = await Order.findById({ _id: id , deleted: false })
                .populate({
                    path: 'IDProduct',
                    populate:
                        { path: 'IDSupplier', select: 'companyName contactEmail contactPhone address logoImage' },
                })
                .populate('IDCustomer')
                .populate('payment');

            return order;
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            throw error;
        }
    }

  async payment(id) {
        // const oder = await this.getOderById(id);
        // console.log(oder);
        // return oder;
    }  
   async getOderByUserId(userID) {
        return await Order.find({ IDCustomer: userID , deleted: false})
        .populate({ path: 'IDProduct' , populate:{ path:'IDSupplier'}})
        .populate('payment');
   }
   async getOderByIdSupplier(userID) {
        const supplier:any = await Supplier.find({ IDuser: userID , deleted: false});
        const product = await Product.find({ IDSupplier: supplier._id , deleted: false});
        console.log('product ------>' + product);
        
        const productIDs = product.map((item) => item._id);
        return await Order.find({ IDProduct: { $in: productIDs } })
        .populate({ path: 'IDProduct' , populate:{ path:'IDSupplier'}})
        .populate('payment');  
   }
   async deleteOder(id, userID) {
        const order:any = await Order.findById({_id:id, deleted: false});
        if (order.IDCustomer !== userID && order.IDProduct.IDSupplier !== userID) {
            console.log("loi roi");
            
            throw new Error('Order Access denied');
        }
        console.log('aaaaaaaaaaaa' + order);
        
        await order.delete();
   }
   async updateOder(id, body, userID) {
        const order:any = await Order.findById(id);
        if (order.IDCustomer !== userID && order.IDProduct.IDSupplier !== userID) {
            throw new Error('Order Access denied');
        }
        const orderUpdates = {};
        for (const key of ['statusOrder']) {
            if (body[key]) {
                orderUpdates[key] = body[key];
            }
        }
        order.set(orderUpdates);
        await order.save();
   }

}
export default new oderService();