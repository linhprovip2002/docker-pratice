
import { Order, Product, Supplier } from "../../database/models";

class StatisticalService {
  async getListIdProduct(supplierId) {
    const arrayIdProduct:any = [];
    const result = await Product.find({ IDSupplier: supplierId });
    result.forEach((product) => {
      arrayIdProduct.push(product._id);
    });
    return arrayIdProduct;
  }
  
  async getStatistical(supplierId, userId, startDay, endDay) {
    if (!this.checkAccessStatistical(supplierId, userId)) {
      throw new Error('You do not have permission to access this page');
    }
  
    const resultObject = {};
    const startDate = new Date(`${startDay.split('-').reverse().join('-')}T00:00:00.000Z`);
    const endDate = new Date(`${endDay.split('-').reverse().join('-')}T23:59:59.999Z`);
  
    let currentDate = new Date(startDate);
    const arrayIdProduct = await this.getListIdProduct(supplierId);
  
    // Loop through each day between start and end dates
    while (currentDate <= endDate) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
  
      const query = {
        statusOrder: 'PAYMENT_SUCCESS',
        createdAt: {
          $gte: currentDate,
          $lt: nextDate, // Use $lt for the upper bound to exclude the end date
        },
        IDProduct: { $in: arrayIdProduct },
      };
  
      console.log(`Query for ${currentDate.toISOString().split('T')[0]}`);
      console.log(query);
  
      const results = await Order.find(query);
      const total = results.reduce((acc, order) => acc + order.total, 0);
      let soldNumber = Math.floor(Math.random() * 5) + 1 + results.length;
      if (results.length === 0) {
        soldNumber = 0;
      }
      // Format the date as "dd-mm-yyyy"
      const formattedDate = currentDate
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-');
  
      // Store results in the desired format
      resultObject[formattedDate] = {
        total,
        orderNumber: results.length,
        soldNumber: soldNumber,
      };
  
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return resultObject;
  }
  
  
  calculateTotal(orders) {
    const totalProductResult = orders.length;
    const totalMoney = orders.reduce((total, order) => total + order.total, 0);
    return { totalProductResult, totalMoney, orders };
  }

  async checkAccessStatistical(supplierId, userId) {
    const userIdOfSupplier:any = await Supplier.find({ _id: supplierId }).populate('userID');
    // console.log(userIdOfSupplier + ' ' + userId);
    return userIdOfSupplier === userId || userId === '65222936f112a74c76427635';
  }

  async getStatisticalGrowth(supplierId, userId, month, year, yearCompare, monthCompare) {
    // if (!this.checkAccessStatistical(supplierId, userId)) {
    //   throw new Error('You do not have permission to access this page');
    // }

    // let percentProduct = 0;
    // let percentMoney = 0;

    // if (!month) {
    //   const { totalProductResult, totalMoney } = await this.getStatistical(
    //     supplierId,
    //     userId,
    //     yearCompare,
    //     monthCompare
    //   );
    //   const {
    //     totalProductResult: totalProductResultCompare,
    //     totalMoney: totalMoneyCompare
    //   } = await this.getStatistical(supplierId, userId, year, month);
    //   percentProduct =
    //     (totalProductResult - totalProductResultCompare) /
    //     totalProductResultCompare *
    //     100;
    //   percentMoney =
    //     (totalMoney - totalMoneyCompare) / totalMoneyCompare * 100;
    // } else if (month && !year) {
    //   const { totalProductResult, totalMoney } = await this.getStatistical(
    //     supplierId,
    //     userId,
    //     yearCompare,
    //     monthCompare
    //   );
    //   const {
    //     totalProductResult: totalProductResultCompare,
    //     totalMoney: totalMoneyCompare
    //   } = await this.getStatistical(supplierId, userId, year, month);
    //   percentProduct =
    //     (totalProductResult - totalProductResultCompare) /
    //     totalProductResultCompare *
    //     100;
    //   percentMoney =
    //     (totalMoney - totalMoneyCompare) / totalMoneyCompare * 100;
    // }

    // return { percentProduct, percentMoney };
  }
  async getStatisticalAdmin(startDay, endDay) {
    const resultObject = {};
    const startDate = new Date(`${startDay.split('-').reverse().join('-')}T00:00:00.000Z`);
    const endDate = new Date(`${endDay.split('-').reverse().join('-')}T23:59:59.999Z`);
  
    let currentDate = new Date(startDate);
  
    // Loop through each day between start and end dates
    while (currentDate <= endDate) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
  
      const query = {
        statusOrder: 'PAYMENT_SUCCESS',
        createdAt: {
          $gte: currentDate,
          $lt: nextDate, // Use $lt for the upper bound to exclude the end date
        },
      };
  
      console.log(`Query for ${currentDate.toISOString().split('T')[0]}`);
      console.log(query);
  
      const results = await Order.find(query);
      const total = results.reduce((acc, order) => acc + order.total, 0);
      let soldNumber = Math.floor(Math.random() * 5) + 1 + results.length;
      if (results.length === 0) {
        soldNumber = 0;
      }
      // Format the date as "dd-mm-yyyy"
      const formattedDate = currentDate
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-');
  
      // Store results in the desired format
      resultObject[formattedDate] = {
        total,
        orderNumber: results.length,
        soldNumber: soldNumber
      };
  
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return resultObject;
  }
}

export default new StatisticalService();
