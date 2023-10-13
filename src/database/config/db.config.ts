import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = `mongodb+srv://dangquangnhatlinh123:${process.env.PASSWORD}@cluster0.8yyrgrm.mongodb.net/bunkid?retryWrites=true&w=majority`;


async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log("Connect failure!!!");
    }
}
export default { connect };