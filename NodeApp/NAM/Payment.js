const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const PaymentSchema = new Schema({
    type: {//1. Nạp tiền, 2. Thanh toán
        type: Number,
        enum: [1, 2]
    },
    //Tiền giao dịch
    transaction: {
        type: Number,
        default: 0
    },
    //Tên tài khoản nạp tiền
    bankName: {
        type: String
    },
    //Số tài khoản
    bankAccount: {
        type: String
    },
    //Chủ tài khoản
    bankOwer: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    //Nguời thực hiện thanh toán
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
});

PaymentSchema.plugin(mongoosePaginate);

module.exports = Payment = mongoose.model('Payment', PaymentSchema);