import { dbConfig } from "../config";
import { Order } from "../models";

async function main() {
    try {
        await dbConfig.connect();

        // Tìm tất cả các đơn hàng
        const orders = await Order.find();

        // Duyệt qua từng đơn hàng
        for (const order of orders) {
            // Kiểm tra xem trường total đã có giá trị hay chưa
            if (order.total === undefined || order.total === null) {
                order.total = 200000;
                await order.save();
            }
        }

        console.log("Update completed successfully.");
    } catch (error) {
        console.error("Error updating orders:", error);
    }
}

// Gọi hàm main để thực thi công việc cập nhật
main();
