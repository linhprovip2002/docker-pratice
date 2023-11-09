import stockService from "./stock.service";

class StockController {

    async createStock(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const body = req.body;
            await stockService.createStock(userId, body);
            return res.status(200).json({ message: 'Stock added successfully' });
        } catch (error) {
          next(error);
        }
    }

    async updateStock(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userToken.IDUser;
            const body = req.body;
            await stockService.updateStock(id, body, userId);
            return res.status(200).json({ message: 'Stock updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getMyStocks(req, res, next) {
        try {
            const userId = req.userToken.IDUser;
            const stocks = await stockService.getMyStocks(userId);
            return res.status(200).json(stocks);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByStockId(req, res, next) {
        try {
        const { id } = req.params;
        const userId = req.userToken.IDUser;
        const stockDetail = await stockService.getProductsByStockId(id, userId);
        return res.status(200).json(stockDetail);

        } catch (error) {
            next(error);
        }
    }

    async deleteStock(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.IDUser;
            await stockService.deleteStock(id, userId);
            return res.status(200).json({ message: 'Stock deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async createProductinStock(req, res, next) {
        try {
            const { id } = req.params; //id Stock
            const userId = req.userToken.IDUser;
            const body = req.body;
            await stockService.createProductinStock(id, body, userId);
            return res.status(200).json({ message: 'Product added successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new StockController();