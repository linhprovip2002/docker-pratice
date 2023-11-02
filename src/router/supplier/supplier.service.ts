import { Supplier, Stock, Product, Category } from '../../database/models'


class SupplierService {
    _constructor() {
    }

    async checkAccessStock(idStock, userID) {
        try {
            const stock = await Stock.findById(idStock).where({deleted: false});
            // Nếu Stock không được tìm thấy, trả về false
            if (!stock) {
            return false;
            }
            // Lấy supplierID của Stock
            const supplierID = stock.supplierID;
            // Tìm kiếm Supplier có supplierID được lấy từ Stock
            const supplier = await Supplier.findById(supplierID).where({deleted: false});
            // Nếu Supplier không được tìm thấy, trả về false
            if (!supplier) {
            return false;
            }
            // Kiểm tra xem Supplier có userID được cung cấp hay không
            if (supplier.userID !== userID) {
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
            if (supplier.userID !== userID) {
            return false;
            }
            // Nếu tất cả các điều kiện trên đều được đáp ứng, trả về true
            return true;
        } catch(error) {
            throw error;
        }
    }

    async getAllSuppliers(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const suppliers = await Supplier.find({deleted:false}).limit(limit).skip(skipCount);
            return suppliers;
        } catch(error) {
            throw error;
        }
    }

    async createSupplier(userId, body) {
        try {
            const supplier = new Supplier(body);
            supplier.userID = userId;
        
            // Create default stock
            const stock = new Stock({
              supplierID: supplier.IDSupplier,
              storageName: `${supplier.companyName} 's storage`,
              storageAddress: 'No information',
              isActive: true,
            });
        
            // Save supplier and stock
            await supplier.save();
            await stock.save();
        } catch(error) {
            throw error;
        }
    }

    async updateSupplier(id, body, userId) {
        try {
            const checkAccess = await this.checkAccessSupplier(id, userId);
            if (checkAccess == false) throw new Error('Supplier Access denied');

            const supplier = await Supplier.findById(id).where({deleted: false});
            if(!supplier) throw new Error('Supplier not found');

            if (body.companyName && body.companyName !== supplier.companyName) {
                const existingSupplier = await Supplier.findOne({ companyName: body.companyName });
                if (existingSupplier) {
                  throw new Error('Company name already exists');
                }
            }
            
            // Cập nhật Supplier
            supplier.companyName = body.companyName || supplier.companyName;
            supplier.description = body.description || supplier.description;
            supplier.contactEmail = body.contactEmail || supplier.contactEmail;
            supplier.contactPhone = body.contactPhone || supplier.contactPhone;
            supplier.logoImage = body.logoImage || supplier.logoImage;
            supplier.address = body.address || supplier.address;
            
            await supplier.save();
        } catch(error) {
            throw error;
        }
    }

    async getDetail(id) {
        try {
            const thesupplier = await Supplier.findById(id).where({deleted: false});
            return thesupplier;
        } catch(error) {
            throw error;
        }
    }

    async getSupplierIDByUserID(userId) {
        const supplier = await Supplier.findOne({ userID: userId });
        if (!supplier) {
            throw new Error('Supplier not found');
        }

        return supplier.IDSupplier;
    }

    async getSupplierIDByStockID(stockID) {
        const stock = await Stock.findById(stockID).where({deleted: false});
        if (!stock) {
            throw new Error('Stock not found');
        }
        const getsupplierID = stock.supplierID;
        const supplier = await Supplier.findById(getsupplierID);
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        return getsupplierID;
    }

    async createStock(userId, body) {
        try {
            const getsupplierID = await this.getSupplierIDByUserID(userId);

            const stock = new Stock({
                IDProduct: body.IDProduct,
                supplierID: getsupplierID,
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

            const products = await Product.find({
                deleted: false,
                IDstock: IDstock
            });
    
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

    async createProductinStock(id, body, userId) {
        try {
            const checkAccess = await this.checkAccessStock(id, userId);
            if (checkAccess == false) throw new Error('Stock Access denied');
            
            const stock = await Stock.findById(id).where({deleted: false});
            if (!stock) {
                throw new Error('Stock not found');
            }
            const supplierID = this.getSupplierIDByStockID(id);
            const categoryId = body.IDCategory;
            const product = new Product({
                IDstock: stock.id,
                IDSupplier: supplierID,
                IDCategory: categoryId,
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

            // Thêm ID_Product vào property Category tương ứng
            const category = await Category.findById(categoryId);
            if (!category) {
              throw new Error('Category not found');
            }
            category.IDProduct.push(product.id);
            await category.save();
        } catch(error) {
            throw error;
        }
    }
}
export default new SupplierService();