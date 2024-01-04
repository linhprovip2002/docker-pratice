import { Product, Review, Discount, Supplier } from '../../database/models'


class ProductService {
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
            if (supplier.userID != userID) {
            return false;
            }
            // Nếu tất cả các điều kiện trên đều được đáp ứng, trả về true
            return true;
        } catch(error) {
            throw error;
        }
    }

    async getProducts(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const products = await Product.find({deleted:false}).limit(limit).skip(skipCount).populate({path:'IDSupplier',select:'companyName description logoImage address contactPhone contactEmail'}).populate({path:'IDCategory',select:'CategoryName'});
            return products;
        } catch(error) {
            throw error;
        }
    }

    async getOneProduct(id) {
        try {
            const product = await Product.findById(id).where({deleted: false}).populate({path:'IDSupplier',select:'companyName description logoImage address contactPhone contactEmail'}).populate({path:'IDCategory',select:'CategoryName'});
            return product;
        } catch(error) {
            throw error;
        }
    }

    async updateProduct(id, body, userId) {
        try {
            const checkAccess = await this.checkAccessProduct(id, userId);
            if (checkAccess == false) throw new Error('Product Access denied');

            const product = await Product.findById(id).where({deleted: false});
            if(!product) throw new Error('Product not found');
            const productUpdates = {};
            for (const key of ['type', 'nameProduct', 'pictureLinks', 'description', 'color', 'size', 'price', 'quantity']) {
            if (body[key]) {
                productUpdates[key] = body[key];
            }
            }
            // Cập nhật sản phẩm
            product.set(productUpdates);
            await product.save();
        } catch(error) {
            throw error;
        }
    }

    async deleteProduct(id, userId) {
        try {
            const checkAccess = await this.checkAccessProduct(id, userId);
            if (checkAccess == false) throw new Error('Product Access denied');

            const product = await Product.findById(id).where({deleted: false});
            if(!product) throw new Error('Product not found');
            await product.set({deleted:true});
            await product.save();
        } catch(error) {
            throw error;
        }
    }

    async getDiscountByProductId(id) {
        try {
            const discounts = await Discount.find({ IDproduct: id }).where({deleted: false});
            return discounts;
        } catch(error) {
            throw error;
        }
    }
    async createProduct(userId, body) {
        const supplier = await Supplier.findOne({ userID: userId, deleted: false, status: 'accepted' });
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        console.log(body);
        const product = new Product({
            IDSupplier: supplier._id,
            IDCategory: body.IDCategory,
            type: body.type,
            nameProduct: body.nameProduct,
            pictureLinks: body.pictureLinks,
            description: body.description,
            color: body.color,
            size: body.size,
            price: body.price,
            quantity: body.quantity,
        });
        await product.save();
    }
    async createReview(id, userId, body) {
        if (await this.isReviewed(id, userId)) {
            throw new Error('User has already reviewed this product');
        }
    
        const review = new Review({
            IDproduct: id,
            IDcustomer: userId,
            rating: body.rating,
            comment: body.comment,
        });
    
        return await review.save();
    }

    async isReviewed(productId, userId) {
        const review = await Review.findOne({ IDproduct: productId, IDcustomer: userId, deleted: false });
        return !!review; 
    }
    async readReview(id){
        const reviews = Review.find({ IDproduct: id, deleted: false }).populate({ path: 'IDcustomer' , select: 'profilePicture firstName lastName' })
        return reviews;
    }
    async updateReview(id, userId, body) {
        const hasAccess = await this.hasAccessReview(id, userId);
        if (!hasAccess) {
            throw new Error('You are not the owner of this review or the review does not exist');
        }
    
        return await Review.findByIdAndUpdate(
            id,
            { $set: { rating: body.rating, comment: body.comment } },
            { new: true } 
        );
    }
    
    async hasAccessReview(id, userId) {
        const review = await Review.findOne({ _id: id, IDcustomer: userId, deleted: false });
        return !!review; 
    }
}
export default new ProductService();