const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //Mô tả hiển thị bên ngoài item
    metaDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String
    },
    ward: {
        type: Schema.Types.ObjectId,
        ref: 'Ward',
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: 'District',
    },
    province: {
        type: Schema.Types.ObjectId,
        ref: 'Province',
    },
    type: {//1. Phòng trọ, 2. Nhà trọ
        type: Number,
        enum: [1, 2] 
    },
    //Các danh mục dự theo type
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    price: {
        type: Number
    },
    //Dien tich
    acreage: {
        type: Number
    },
    //Chieu dai
    length: {
        type: Number
    },
    //Chieu rong
    width: {
        type: Number
    },
    //Độ rộng đường trước nhà
    roadAhead: {
        type: Number
    },
    //Số tầng (đối với nhà trọ)
    floorNumber: {
        type: Number
    },
    //Số phòng ngủ (đối với nhà trọ)
    bedroomNumber: {
        type: Number
    },
    // Hướng 
    direction: {
        type: Number
    },
    //Toa do google map
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    //Them lien ket (zalo, facebook ...) để người thuê dễ dàng liên hệ
    hyperLink: {
        type: String
    },
    preview: {
        type: String
    },
    images: [{
        type: String
    }],
    userName: {
        type: String
    },
    userPhone: {
        type: String
    },
    //Trạng thái bài đăng
    status: {
        type: Number,
        default: 1 , 
        enum: [1, 2, 3] //1. Đang chờ, 2. Đã duyệt, 3. Đã hủy,
    },
    //Người theo dõi
    follows: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rates: [{
        rate: {
            type: Number,
            enum:[1, 2, 3, 4, 5]
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    comments: [{
        comment: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date
        }
    }],
    //Hệ số bài đăng có phí
    postagePoint: {
        type: Number,
        default: 0
    },
    //Ngày hết hạn của phí bài đăng
    postageExpirationDate: {
        type: Date
    }
},{
    timestamps: true,
});

PostSchema.plugin(mongoosePaginate);

module.exports = Post = mongoose.model('Post', PostSchema);