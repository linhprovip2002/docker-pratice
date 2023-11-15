import { Discount, Product, Supplier, User, Role } from '../../database/models'


class DiscountService {
    _constructor() {
    }
    async checkAccessProduct(idProduct, userID) {
        try {
            const user = await User.findById(userID).populate({
                path: 'Roles',
                match: { deleted: false }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const superUserRole = await Role.findOne({ roleName: 'superUser' });
            if (!superUserRole) {
                throw new Error('superUser role not found');
            }

            const isSuperUser = user.Roles.some(role => role.equals(superUserRole._id));
            if (isSuperUser == true) return true;

            const product = await Product.findById(idProduct).where({deleted: false});
            // Nếu Product không được tìm thấy, trả về false
            if (!product) {
            return false;
            }
            // Lấy supplierID của Product
            const supplierID = product.IDSupplier;
            // Tìm kiếm Supplier có supplierID được lấy từ Product
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

    async createDiscount(idProduct, body, userId) {
        try {

            const checkAccess = await this.checkAccessProduct(idProduct, userId);
            if (checkAccess == false) throw new Error('Product Access denied');

            const product = await Product.findById(idProduct).where({deleted: false});

            // Nếu đối tượng Product không được tìm thấy, trả về null
            if (!product) {
                throw new Error('Product not found');
            }
            // Lấy ID Supplier từ đối tượng Product
            const supplierID = product.IDSupplier;

            // Tạo một đối tượng Discount mới
            const discount = new Discount({
            IDSupplier: supplierID,
            IDproduct: idProduct,
            typeDiscount: body.typeDiscount,
            discount: body.discount,
            startDate: body.startDate,
            endDate: body.endDate,
            });
            // Lưu đối tượng Discount vào cơ sở dữ liệu
            await discount.save();
        } catch(error) {
            throw error;
        }
    }

    async updateDiscount(id, body, userId) {
        try {
            const discount = await Discount.findById(id).where({deleted: false});

            // Nếu đối tượng Discount không được tìm thấy, trả về null
            if (!discount) {
                throw new Error('Discount not found');
            }

            const checkAccess = await this.checkAccessProduct(discount.IDproduct, userId);
            if (checkAccess == false) throw new Error('Product Access denied');

            discount.typeDiscount = body.typeDiscount;
            discount.discount = body.discount;
            discount.startDate = body.startDate;
            discount.endDate = body.endDate;

            await discount.save();
        } catch(error) {
            throw error;
        }
    }

    async deleteDiscount(id, userId) {
        try {
            const discount = await Discount.findById(id).where({deleted: false});

            // Nếu đối tượng Discount không được tìm thấy, trả về null
            if (!discount) {
                throw new Error('Discount not found');
            }

            const checkAccess = await this.checkAccessProduct(discount.IDproduct, userId);
            if (checkAccess == false) throw new Error('Product Access denied');
            
            await discount.set({deleted:true});
            await discount.save();
        } catch(error) {
            throw error;
        }
    }

}
export default new DiscountService();