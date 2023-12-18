import { orderService } from "../order";

class StatisticalService {
  async getStatistical(supplierId, userId, month, year) {
    if (!this.checkAccessStatistical(supplierId, userId)) {
      throw new Error('You do not have permission to access this page');
    }

    const orders = await orderService.getOrderByIdSupplier(supplierId);
    const result = orders.filter(order => order.statusOrder === 'PAYMENT_SUCCESS');
    console.log(result);

    const resultFilter = result.filter(order =>
      (!month || order.createdAt.getMonth() + 1 === parseInt(month)) &&
      (!year || order.createdAt.getFullYear() === parseInt(year))
    );

    return this.calculateTotal(resultFilter);
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
    if (!this.checkAccessStatistical(supplierId, userId)) {
      throw new Error('You do not have permission to access this page');
    }

    let percentProduct = 0;
    let percentMoney = 0;

    if (!month) {
      const { totalProductResult, totalMoney } = await this.getStatistical(
        supplierId,
        userId,
        yearCompare,
        monthCompare
      );
      const {
        totalProductResult: totalProductResultCompare,
        totalMoney: totalMoneyCompare
      } = await this.getStatistical(supplierId, userId, year, month);
      percentProduct =
        (totalProductResult - totalProductResultCompare) /
        totalProductResultCompare *
        100;
      percentMoney =
        (totalMoney - totalMoneyCompare) / totalMoneyCompare * 100;
    } else if (month && !year) {
      const { totalProductResult, totalMoney } = await this.getStatistical(
        supplierId,
        userId,
        yearCompare,
        monthCompare
      );
      const {
        totalProductResult: totalProductResultCompare,
        totalMoney: totalMoneyCompare
      } = await this.getStatistical(supplierId, userId, year, month);
      percentProduct =
        (totalProductResult - totalProductResultCompare) /
        totalProductResultCompare *
        100;
      percentMoney =
        (totalMoney - totalMoneyCompare) / totalMoneyCompare * 100;
    }

    return { percentProduct, percentMoney };
  }
}

export default new StatisticalService();
