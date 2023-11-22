import { Supplier, Stock, Product, Category } from '../../database/models'

class StockService {
    _constructor() {
    }

    async checkAccessStock(idStock, userID) {
        try {
            const stock = await Stock.findById(idStock).where({deleted: false});
            // Nếu Stock không được tìm thấy, trả về false
            if (!stock) {
                throw new Error('Stock not found');
            }
            // Lấy supplierID của Stock
            const supplierID = stock.supplierID;
            // Tìm kiếm Supplier có supplierID được lấy từ Stock
            const supplier = await Supplier.findById(supplierID).where({deleted: false});
            // Nếu Supplier không được tìm thấy, trả về false
            if (!supplier) {
                throw new Error('Supplier not found ');
            }
            // Kiểm tra xem Supplier có userID được cung cấp hay không
            if (supplier.userID != userID) {
            return false;
            }
            // Nếu tất cả các điều kiện trên đều được đáp ứng, trả về true
            return true;
        } catch(error) {
            throw error;
        }
    }

    async checkAccessSupplier(supplierID, userID) {
        try {
            const supplier = await Supplier.findById(supplierID).where({deleted: false});
            // Nếu Supplier không được tìm thấy, trả về false
            if (!supplier) {
            return false;
            }
            // Kiểm tra xem Supplier có userID được cung cấp hay không
            if (supplier.userID != userID) {
            return false;
            }
            // Nếu tất cả các điều kiện trên đều được đáp ứng, trả về true
            return true;
        } catch(error) {
            throw error;
        }
    }

    async getSupplierIDByUserID(userId) {
        const supplier = await Supplier.findOne({ userID: userId });
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        return supplier._id;
    }

    async getSupplierIDByStockID(stockID) {
        const stock = await Stock.findById(stockID).where({deleted: false});
        if (!stock) {
            throw new Error('Stock not found');
        }
        const getSupplierID = stock.supplierID;
        const supplier = await Supplier.findById(getSupplierID);
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        return getSupplierID;
    }

    async createStock(userId, body) {
        try {
            const getSupplierID = await this.getSupplierIDByUserID(userId);
            const stock = new Stock({
                IDProduct: body.IDProduct,
                supplierID: getSupplierID,
                storageAddress: body.storageAddress,
                storageName: body.storageName,
                isActive: true,
            });

            await stock.save();
        } catch(error) {
            throw error;
        }
    }

    async updateStock(id, body, userId) {
        try {
            const checkAccess = await this.checkAccessStock(id, userId);
            if (checkAccess == false) throw new Error('Stock Access denied');

            const stock = await Stock.findById(id).where({deleted: false});
            if (!stock) {
                throw new Error('Stock not found');
            }

            const updatedFields = {
                storageAddress: body.storageAddress,
                storageName: body.storageName,
                isActive: body.isActive,
            };

            stock.set(updatedFields);
            await stock.save();
        } catch(error) {
            throw error;
        }
    }

    async getMyStocks(userId) {
        try {
            const getsupplierID = await this.getSupplierIDByUserID(userId);
            const myStocks = await Stock.find({
                 supplierID: getsupplierID,
                 deleted: false
                });
            return myStocks;
        } catch(error) {
            throw error;
        }
    }

    async getProductsByStockId(IDstock, userId) {
        try {

            const checkAccess = await this.checkAccessStock(IDstock, userId);
            if (checkAccess == false) throw new Error('Stock Access denied');

            const stock = await Stock.findById(IDstock).populate('IDProduct');
            if (!stock) {
                throw new Error('Stock not found');
            }

            const products = stock.IDProduct;
            return products;
        } catch (error) {
            throw error;
        }
    }

    async deleteStock(id, userId) {
        try {
            const checkAccess = await this.checkAccessStock(id, userId);
            if (checkAccess == false) throw new Error('Stock Access denied');

            const stock = await Stock.findById(id).where({deleted: false});
            if(!stock) throw new Error('Product not found');

            await stock.set({deleted:true});
            await stock.save();

        } catch(error) {
            throw error;
        }
    }

    async createProductionStock(id, body, userId) {
        try {
            const checkAccess = await this.checkAccessStock(id, userId);
            if (checkAccess == false) throw new Error('Stock Access denied');
            
            const stock = await Stock.findById(id).where({deleted: false});
            if (!stock) {
                throw new Error('Stock not found');
            }
            const supplierID = await this.getSupplierIDByStockID(id);
            if (!supplierID) {
                throw new Error('Supplier not found');
            }
            
            const getCateGory = await Category.findById(body.IDCategory);

            if (!getCateGory) {
                throw new Error('Category not found');
            }
            const categoryID = getCateGory._id;
            const product = new Product({
                IDSupplier: supplierID,
                IDCategory: categoryID,
                type: body.type,
                nameProduct: body.nameProduct,
                pictureLinks: body.pictureLinks,
                description: body.description,
                color: body.color,
                size: body.size,
                price: body.price,
                quantity: body.quantity
            });
            
            await product.save();

            getCateGory.IDProduct.push(product._id);
            stock.IDProduct.push(product._id);
            
            await getCateGory.save();
            await stock.save();
        } catch(error) {
            throw error;
        }
    }
}
export default new StockService();