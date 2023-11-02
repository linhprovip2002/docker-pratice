import { Discount, Product, Supplier } from '../../database/models'


class DiscountService {
    _constructor() {
    }
    async checkAccessProduct(idProduct, userID) {
        try {
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
            if (supplier.userID !== userID) {
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

        } catch(error) {
            throw error;
        }
    }

    async updateDiscount(id, body, userId) {
        try {

        } catch(error) {
            throw error;
        }
    }

    async deleteDiscount(id, userId) {
        try {

        } catch(error) {
            throw error;
        }
    }

}
export default new DiscountService();