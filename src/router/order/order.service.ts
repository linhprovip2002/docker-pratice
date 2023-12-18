import { Order, Product, Supplier } from "../../database/models";
import { statusOrder } from "../../database/models/enum";

class oderService {
    _constructor() {
    }
//create oder follow supplier 
   async createOrder(orderData, userID) {
      const productIDs = orderData.IDProducts; 

      for (const productID of productIDs) {
          await Order.create({
              IDProduct: productID,
              IDCustomer: userID,
              orderDate: new Date(),
              statusOrder: statusOrder.PENDING,
              total: orderData.total,
              ShipAddress: orderData.ShipAddress,
              ShipPhone: orderData.ShipPhone,
              description: orderData.description
          });
      }
    }

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
        const supplier:any = await Supplier.findOne({ userID: userID , deleted: false});
        if(!supplier) {
            throw new Error('Supplier not found');
        }
        console.log('supplier ------>' + supplier);
        const product = await Product.find({ IDSupplier: supplier._id , deleted: false});   
        const productIDs = product.map((item) => item._id);
        return await Order.find({ IDProduct: { $in: productIDs } , deleted: false })
        .populate({ path: 'IDProduct' , populate:{ path:'IDSupplier'}})
        .populate('payment');  
   }
   async getOrderByIdSupplier(userID) {
    const supplier:any = await Supplier.findOne({ userID: userID , deleted: false});
        if(!supplier) {
            throw new Error('Supplier not found');
        }
        console.log('supplier ------>' + supplier);
        const product = await Product.find({ IDSupplier: supplier._id , deleted: false});   
        const productIDs = product.map((item) => item._id);
        return await Order.find({ IDProduct: { $in: productIDs } , deleted: false })
   }
   async checkOwner(userId, oderId) {
        const order:any = await Order.findById({_id:oderId, deleted: false});
        // find product
        const product: any = await Product.findOne({ _id: order.IDProduct, deleted: false });
        // find supplier 
        const supplier: any = await Supplier.findOne({ _id: product.IDSupplier , deleted: false});
        if (order.IDCustomer !== userId || supplier.userID !== userId ) {
            return false;
        }
        return true;
   }
   async deleteOder(id, userID) {
        const order:any = await Order.findById({_id:id, deleted: false});
        console.log('order: ' + order);
        
        if(await this.checkOwner(userID, order._id)) {
            throw new Error('Order Access denied');
        }
        console.log('aaaaaaaaaaaa' + order);
        
        await order.delete();
        // return;
   }
   async updateOrder(id, body, userID) {
        console.log('id: ' + id + 'body: ' + body + 'userID: ' + userID);
        
        const order:any = await Order.findOne({_id:id, deleted: false});
        console.log('order: ' + order);
        
        if(await this.checkOwner(userID, order._id)) {
            throw new Error('Order Access denied');
        }
        await Order.findOneAndUpdate( {_id:order._id}, {$set:body})
   }
}
export default new oderService();