import { base_URL } from "../../constant";
const vnConfig = {
    vnp_TmnCode: "G03VWIVJ",
    vnp_HashSecret: "GJBXYVJYKJRFSRPDAOWKTGDJRBVYVCFW",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    vnp_ReturnUrl: `${base_URL}/api/payment/vnpay/vnpay_return?order_id=`,
  };
  
  export default vnConfig;
  