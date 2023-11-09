import { Product, Review, Discount, Supplier } from '../../database/models'


class ProductService {
    _constructor() {
    }

    async checkAccessReview(reviewID, userID) {
        try {
            const review = await Review.findById(reviewID).where({deleted: false});
            if (!review) {
            return false;
            }
            if (review.IDcustomer != userID) {
            return false;
            }
            // Nếu tất cả các điều kiện trên đều được đáp ứng, trả về true
            return true;
        } catch(error) {
            throw error;
        }
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
            const products = await Product.find({deleted:false}).limit(limit).skip(skipCount);
            return products;
        } catch(error) {
            throw error;
        }
    }

    async getOneProduct(id) {
        try {
            const product = await Product.findById(id).where({deleted: false});
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

    async getReviewByProductId(page, limit, id) {
        try {
            page ? page : null;
            limit ? limit : null;
            const skipCount = (page - 1) * limit
            const reviews = await Review.find({
                deleted:false,
                IDproduct: id
            }).limit(limit).skip(skipCount);
            
            let totalRating = 0;
            for (const review of reviews) {
            if (review.rating !== undefined) {
                totalRating += review.rating;
            }
            }
            const averageRating = totalRating / reviews.length;

            // Tạo nested json format
            const result = {
                id: id,
                average_rating: averageRating,
                reviews: reviews.map((review) => ({
                IDcustomer: review.IDcustomer,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                })),
            };

            return result;
        } catch(error) {
            throw error;
        }
    }

    async createReview(id, userId, body) {
        try {
            const getreview = await Review.find({
                deleted:false,
                IDcustomer: userId
            });
            if(!getreview)
            {
                const product = await Product.findById(id).where({deleted: false});
                if (!product) {
                throw new Error('Product not found');
                }

                const review = new Review({
                IDproduct: id,
                IDcustomer: userId,
                rating: body.rating,
                comment: body.comment,
                });

                await review.save();
            }
            else
            {
                throw new Error('1 person can only write 1 review per product'); 
            }
        } catch(error) {
            throw error;
        }
    }

    async updateReview(id, body, userId) {
        try {
            const getreview = await Review.findOne({
                deleted:false,
                IDcustomer: userId
            });
            if(!getreview)
            {
                throw new Error('Review not found');
            }
            const idReview = getreview._id;
            const checkAccess = await this.checkAccessReview(idReview, userId);
            if (checkAccess == false) throw new Error('Review Access denied');

            const product = await Product.findById(id);
            if (!product) {
            throw new Error('Product not found');
            }
            getreview.rating = body.rating;
            getreview.comment = body.comment;

            // Lưu review vào cơ sở dữ liệu
            await getreview.save();
        } catch(error) {
            throw error;
        }
    }
}
export default new ProductService();