const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const PostageSchema = new Schema({
    //Trọng số của thẻ vip, trọng số càng cao thì càng được ưu tiên
    point: {
        type:  Number
    },
    postage: {
        type: Number
    },
    name: {
        type: String
    },
    type: {//1. Phí trong vòng 1 ngày, 2. Phí cho 30 ngày
        type: String,
        enum: [1, 2]
    }
}, {
    timestamps: true,
});

PostageSchema.plugin(mongoosePaginate);

module.exports = Postage = mongoose.model('Postage', PostageSchema);