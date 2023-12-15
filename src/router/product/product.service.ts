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
    async createProduct(body, userId) {
        const supplier = await Supplier.findOne({ userID: userId, deleted: false });
        if (!supplier) {
            throw new Error('Supplier not found');
        }
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
    async createRating(userId, id, body) {
        try {
            const product:any = await Product.findOne({ _id: id, deleted: false }).exec();
    
            if (!product) {
                throw new Error('Product not found');
            }
    
            product.rate = {
                IDcustomer: userId,
                rating: body.rating,
            };
            return await product.save();
        } catch (error) {
            console.log(error);
        }
    }
    async createComment(userId, id, body) {
        try {
            const product = await Product.findOne({ _id: id, deleted: false }).exec();
    
            if (!product) {
                throw new Error('Product not found');
            }
    
            const comment = await Review.create({
                IDproduct: id,
                IDcustomer: userId,
                content: body.content,
            });
    
            return comment;
        } catch (error) {
            console.error(error);
            // You may want to handle the error differently, e.g., return an error response.
            throw new Error('Failed to create comment');
        }
    }
    async createReply(userId, commentId, body) {
        try {
            const comment = await Review.findOneAndUpdate({ _id: commentId, deleted: false }, {
                $push: {
                    reply: {
                        userId: userId,
                        content: body.content,
                    },
                },
            }, { new: true }).exec();

            return comment;
        } catch (error) {
            throw new Error('Failed to create reply');
        }
        
    }
    async getCommentsByProductId(id) {
        try {
            const comments = await Review.find({ IDproduct: id, deleted: false }).populate({path:'IDcustomer', select:'firstName lastBane profilePicture'}).populate({path:'reply.IDadmin',select: {path:'IDcustomer', select:'firstName lastBane profilePicture'}});
            return comments;
        } catch (error) {
            console.log(error);
            
            throw new Error('Failed to get comments');
        }
    }
    async updateComment(userId, commentId, body) {
        const comment: any = await Review.findById(commentId);
            console.log(comment.userId != userId);
            if( comment.IDcustomer === userId || userId === '65222936f112a74c76427635' )
            {
                  return Review.updateOne({_id:commentId},{$set:{content:body.content}});
            } else {
                  throw new Error('User is not owner comment');
            }
        }
    async deleteComment(userId, commentId) {
        const comment: any = await Review.findById(commentId);

            if( comment.IDcustomer === userId || userId === '65222936f112a74c76427635' )
            {
                  return Review.updateOne({_id:commentId},{$set:{deleted:true}});
            } else {
                  throw new Error('User is not owner comment');
            }
    }    
}
export default new ProductService();