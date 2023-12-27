
import { Order } from "../../database/models";

class StatisticalService {
  
  async getStatistical(supplierId, userId, month, year, day) {
    if (!this.checkAccessStatistical(supplierId, userId)) {
      throw new Error('You do not have permission to access this page');
    }
  
    const query:any = {
      statusOrder: 'PAYMENT_SUCCESS',
    };
    if (month !== undefined) {
      if (day !== undefined) {
        query['createdAt'] = {
          $gte: new Date(year, month - 1, day),
          $lt: new Date(year, month - 1, day + 1)
        };
      } else {
        query['createdAt'] = {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1)
        };
      }
    }
    console.log(query);
    const results = await Order.find(query);
    // result return sum of amount and total products
    const total = results.reduce((total, order) => total + order.total, 0);
  
    return { ...results, total: total , numberOfOrder: results.length};
  }
  
  

  calculateTotal(orders) {
    const totalProductResult = orders.length;
    const totalMoney = orders.reduce((total, order) => total + order.total, 0);
    return { totalProductResult, totalMoney, orders };
  }

  checkAccessStatistical(supplierId, userId) {
    return supplierId === userId || userId === '65222936f112a74c76427635';
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
}

export default new StatisticalService();
