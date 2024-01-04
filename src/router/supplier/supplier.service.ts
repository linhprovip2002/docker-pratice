import { Supplier, Stock, Product, User } from '../../database/models'
import { userService } from '../user';

class SupplierService {
    _constructor() {
    }


    async checkAccessSupplier(supplierID, userID) {
        try {
            
            const supplier = await Supplier.findById(supplierID).where({deleted: false, status: 'accepted'});
            // Nếu Supplier không được tìm thấy, trả về false
            if (supplier == null) {
                console.log(supplier);
                
            return false;
            }
            // Kiểm tra xem Supplier có userID được cung cấp hay không
            if (supplier.userID != userID) {
                console.log("khong co quyen");
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
            const suppliers = await Supplier.find({deleted:false}).limit(limit).skip(skipCount).populate('userID');
            return suppliers;
        } catch(error) {
            throw error;
        }
    }
    async checkHasSupplier(userId) {
            const supplier = await Supplier.findOne({ userID: userId });
            if (!supplier) {
                return false;
            }
            return true;
    }

    async createSupplier(userId, body) {
            if (await this.checkHasSupplier(userId)) {
                return new Error('Supplier already exists');
            }
            const supplier = new Supplier({
                companyName: body.companyName,
                description: body.description,
                contactEmail: body.contactEmail,
                contactPhone: body.contactPhone,
                address: body.address,
            });
            if (body.logoImage) {
                supplier.logoImage = body.logoImage;
            }
            supplier.userID = userId;
        
            // Create default stock
            // const stock = new Stock({
            //   supplierID: supplier.IDSupplier,
            //   storageName: `${supplier.companyName} 's storage`,
            //   storageAddress: 'No information',
            //   isActive: true,
            // });
        
            // // Save supplier and stock
            return await supplier.save();
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
            const thesupplier = await Supplier.findById(id).where({deleted: false}).populate('userID');
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
        return supplier;
    }

    async getSupplierIDByStockID(stockID) {
        const stock = await Stock.findById(stockID).where({deleted: false}).populate('supplierID').populate('IDProduct');
        if (!stock) {
            throw new Error('Stock not found');
        }
        const getsupplierID = stock.supplierID;
        const supplier = await Supplier.findById(getsupplierID).where({deleted: false}).populate('userID');
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        return getsupplierID;
    }
    async registerSupplier(userId, body) {
            const supplierExist = await Supplier.find({ companyName: body.companyName });
            if (supplierExist && supplierExist.length > 0) {
                throw new Error('Company name already exists');
            }
            if (await this.checkHasSupplier(userId)) {
                throw new Error('Supplier already exists');
            }
            const supplier = new Supplier({
                companyName: body.companyName,
                description: body.description,
                contactEmail: body.contactEmail,
                contactPhone: body.contactPhone,
                address: body.address,
            });
            if (body.logoImage) {
                supplier.logoImage = body.logoImage;
            }
            supplier.userID = userId;
            await supplier.save();
    }
    async acceptSupplier (ids) {
        const userIds = await Supplier.find({ _id: { $in: ids } }).select('userID').lean();

        if (!userIds || userIds.length === 0) {
            console.log('No matching suppliers found');
            return false;
        }

        const userIdArray = userIds.map(user => user.userID);

        const users = await User.find({ _id: { $in: userIdArray } });

        if (!users || users.length === 0) {
            console.log('No matching users found');
            return false;
        }

        for (const user of users) {
            await userService.addRoleForUser(user._id, '654d9fc02e99806f670495f2');
        }
        return await Supplier.updateMany({ _id: { $in: ids } }, { status: 'accepted' });
   
    }
    async getSellerService(page?, limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const suppliers = await Supplier.find({deleted:false }).limit(limit).skip(skipCount)
            .populate('userID')
            return suppliers;
        } catch(error) {
            throw error;
        }
    }
    async getProducts(supplierID, page?, limit?) {
        page ? page : null;
        limit ? limit : null;
        const skipCount = (page - 1) * limit
        const products = await Product.find({ IDSupplier: supplierID, deleted: false }).limit(limit).skip(skipCount).populate('IDCategory');
        return products;
    }
    async getSupplierByUserId(supplierID) {
        const supplier = await Supplier.findOne({ userID: supplierID }).populate('userID');
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        return supplier;
    }
}
export default new SupplierService();