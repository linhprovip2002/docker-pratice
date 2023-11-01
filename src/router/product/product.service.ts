import { Product, Review, Discount } from '../../database/models'


class ProductService {
    _constructor() {
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

    async updateProduct(id, body) {
        try {
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

    async deleteProduct(id) {
        try {
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
        } catch(error) {
            throw error;
        }
    }

    async updateReview(id, idReview, body) {
        try {
            const product = await Product.findById(id);
            if (!product) {
            throw new Error('Product not found');
            }

            const review = await Review.findById(idReview);
            if (!review) {
            throw new Error('Review not found');
            }

            review.rating = body.rating;
            review.comment = body.comment;

            // Lưu review vào cơ sở dữ liệu
            await review.save();
        } catch(error) {
            throw error;
        }
    }
}
export default new ProductService();