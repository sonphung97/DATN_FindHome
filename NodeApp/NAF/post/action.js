const { initConnection } = require('../../helpers/dbHelpers');
const paymentAction = require('../payment/action');

exports.createPost = async (data, user) => {
    let Post = initConnection().model("Post");
    let User = initConnection().model("User");
        
    //Kiem tra bai dang VIP
    if (data.postageType && data.postagePoint) {
        let date = new Date();

        if (data.postageType === 1) {//Goi 1 ngay
            data.postageExpirationDate = date.setDate(date.getDate() + 1)
        } else {//Goi 30 ngay
            data.postageExpirationDate = date.setDate(date.getDate() + 30)
        }
        data.status = 2;
    } else if (!data.postageType && data.postagePoint) {
        data.postagePoint = 0;
    }

    //Them bai viet vao db
    let newPost = await Post.create({ ...data, userName: user.name, userPhone: user.phone });
    let post = await Post.findById({ _id: newPost._id });

    let userInfo = await User.findById(user._id);

    //Them vao danh sach bai post cua nguoi dang
    if (userInfo) {
        userInfo.posts.push(newPost._id);
        await userInfo.save();
    }

    //Luu lich su giao dich
    if (data.postageType && data.postagePoint) {
        const transactionData = {
            owner: user._id,
            post: post._id,
            transaction: data.postage,
            type: 2
        }
        await paymentAction.createPayment(transactionData, user)
    }

    return { post }
}

exports.getAllPosts = async (query) => {
    let { page, limit, categories, address, province, district, ward,
        direction, priceFrom, priceTo, acreageFrom, acreageTo,
        title, userName, userPhone, status, follows} = query;
    let option = {};

    //Set query option
    if (categories) option.categories = categories;
    if (address) option.address = new RegExp(address, "i");
    if (province) option.province = province;
    if (district) option.district = district;
    if (ward) option.ward = ward;
    if (direction) option.direction = direction;
    if (priceFrom && priceTo) option.price = { $gte: priceFrom, $lte: priceTo }
    if (acreageFrom && acreageTo) option.acreage = { $gte: acreageFrom, $lte: acreageTo }
    if (title) option.title = new RegExp(title, "i");
    if (userName) option.userName = new RegExp(userName, "i");
    if (userPhone) option.userPhone = new RegExp(userPhone, "i");
    if (status) option.status = status;
    if (follows) option.follows = follows;

    let Post = initConnection().model("Post");

    if (!page || !limit) {
        let allPosts = await Post
            .find(option)
            .populate([{
                path: "province"
            },
            {
                path: "district"
            },
            {
                path: "ward"
            }])
            .sort({ createdAt: 'desc', postagePoint: -1 })

            console.log("allPosts------", allPosts?.length);
        
        return {allPosts}
    } else {
        let allPosts = await Post.paginate(option, {
            page,
            limit,
            populate: [{
                path: "province"
            },
            {
                path: "district"
            },
            {
                path: "ward"
            }],
            sort: { 'postagePoint': -1, 'createdAt': -1 }
        })

        return {allPosts}
    }
}

exports.getDetailPost = async (id ) => {
    let Post = initConnection().model("Post");

    let post = await Post
        .findById(id)
        .populate([{
            path: "province"
        },
        {
            path: "district"
        },
        {
            path: "ward"
        },
        {
        path: "categories"
        },
        {
            path: "comments.user", select: 'name avatar'
        }])
    
    if (!post) {
        throw Error("Post is not existing")
    }

    return { post }
}

//Chỉ người đăng mới được sửa, nên cần xác thực trước khi trả về data
exports.getPostForUpdate = async (postId, userId) => {
    let Post = initConnection().model("Post");
    let User = initConnection().model("User");

    let user = await User.findById(userId);

    if (!user) {
        throw Error("User is not existing")
    }

    //Check post đó có phải của user này hay k
    let isPostOfUser = user.posts.includes(postId);

    if (!isPostOfUser) {
        throw Error("you_can_not_access")
    }

    let post = await Post
        .findById(postId)
    
    if (!post) {
        throw Error("Post is not existing")
    }

    return { post }
}

exports.updatePost = async (id, data) => {
    let Post = initConnection().model("Post");

    if (!data.preview) {
        data.preview = undefined;
    }

    if (!data.address) {
        data.address = undefined;
    }

    if (!data.description) {
        data.description = undefined;
    }

    if (!data.width) {
        data.width = undefined;
    }

    if (!data.length) {
        data.length = undefined;
    }

    if (!data.roadAhead) {
        data.roadAhead = undefined;
    }

    if (!data.floorNumber) {
        data.floorNumber = undefined;
    }

    if (!data.bedroomNumber) {
        data.bedroomNumber = undefined;
    }

    let post = await Post.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { post }
}

exports.deletePost = async (postId, userId) => {

    let Post = initConnection().model("Post");
    let User = initConnection().model("User");

    let post = await Post.findByIdAndDelete(postId);

    //Loại bỏ post khỏi user
    let user = await User.findById(userId);
    let posts = [...user.posts || []];
    user.posts = posts.filter(p => p.toString() !== postId);
    await user.save();

    return {post}
}

//Comment
exports.comment = async (id, data) => {
    let Post = initConnection().model("Post");
    const post = await Post.findById(id);

    if (!post) {
        throw Error("Post is not existing!")
    }

    post.comments = data.comments;
    await post.save();

    let postDetail =  await Post
    .findById(id)
    .populate([{
        path: "province"
    },
    {
        path: "district"
    },
    {
        path: "ward"
    },
    {
        path: "categories"
    },
    {
        path: "comments.user", select: 'name avatar'
    }])
    return { post: postDetail }
}

//Comment
exports.rate = async (id, data) => {
    let Post = initConnection().model("Post");
    const post = await Post.findById(id);
    
    if (!post) {
        throw Error("Post is not existing!")
    }
    post.rates = data.rates;
    await post.save();

    let postDetail =  await Post
    .findById(id)
    .populate([{
        path: "province"
    },
    {
        path: "district"
    },
    {
        path: "ward"
    },
    {
        path: "categories"
    },
    {
        path: "comments.user", select: 'name avatar'
    }])
    return { post: postDetail }
}

exports.follow = async (id, data) => {
    let Post = initConnection().model("Post");
    const post = await Post.findById(id);

    if (!post) {
        throw Error("Post is not existing!")
    }
    post.follows = data.follows;
    await post.save();

    let postDetail =  await Post
    .findById(id)
    .populate([{
        path: "province"
    },
    {
        path: "district"
    },
    {
        path: "ward"
    },
    {
        path: "categories"
    },
    {
        path: "comments.user", select: 'name avatar'
    }])
    return { post: postDetail }
}

//Check outdated postage
exports.checkOutDatedPostage = async () => {
    let option = { postageExpirationDate: { $lt: new Date() }};

    let Post = initConnection().model("Post");

    await Post.updateMany(option, {
        $set: {
            postagePoint: 0,
            postageExpirationDate: null
        }
    })

    return "Kiểm tra và cập nhật trạng thái phí thành công"
}

exports.getDashboardData = async (query) => {
    let { startDate, endDate, province, district, type } = query;
    let option = {};
    
    if (startDate && endDate) {
        option = {
            ...option,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }
    }

    if (province) option.province = province;
    if (district) option.district = district;
    if (type) option.type = type;

    let Post = initConnection().model("Post");

    let posts = await Post.find(option);

    //Lấy dữ liệu theo ngày 
    const groupForDate = await groupDataForDate(posts, new Date(startDate), new Date(endDate));
    //Lấy dữ liệu theo khu vực
    const groupForArea =  await groupDataForArea(posts, province, district);

    //Map data để hiển thị trên biểu đồ
    let groupForAreaMap = groupForArea.map(item => {
        let totalPrice = item.data.reduce((a, b) => {
            return a + b.price;
        }, 0)

        return {
            x: item.area?.name,
            y: item.data?.length ? 
            totalPrice / item.data?.length : 
            0
        }
    })

    let groupForDateMap = groupForDate.map(item => {
        let totalPrice = item.post.reduce((a, b) => {
            return a + b.price;
        }, 0)

        return {
            x: item.date,
            y: item.post?.length ? 
            (totalPrice / item.post?.length) : 
            0
        }
    }) 

    return {
        dataForArea: groupForAreaMap,
        dataForDate: groupForDateMap
    }
}

const groupDataForArea = async (posts, province, district) => {
    //Nếu không query tỉnh thì lấy dữ liệu từng tỉnh trong cả nước
    if (!province) {
        let Province = initConnection().model("Province");
        let provinces = await Province.find({});
        let groups = [];

        if (!provinces){
            throw Error("Data is null!")
        }

        provinces.forEach(pro => {
            let postsInfo = posts.filter(post => {
                return JSON.stringify(post.province) === JSON.stringify(pro._id);
            });

            if (!postsInfo) {
                groups.push({
                    data: [],
                    area: pro
                })
            } else {
                groups.push({
                    data: postsInfo,
                    area: pro
                })
            }
        })
        
        return groups;
    }

    //Nếu không query tỉnh và không query huyện, thì lấy dữ liệu theo các huyện trong tỉnh đó
    if (province && !district) {
        let Province = initConnection().model("Province");
        let District = initConnection().model("District");
        let provinceInfo = await Province.findById(province);
        let districts = await District.find({provinceId: provinceInfo.id});
        let groups = [];

        if (!districts){
            throw Error("Data is null!")
        }

        districts.forEach(dis => {
            let postsInfo = posts.filter(post => {
                return JSON.stringify(post.district) === JSON.stringify(dis._id);
            });

            if (!postsInfo) {
                groups.push({
                    data: [],
                    area: dis
                })
            } else {
                groups.push({
                    data: postsInfo,
                    area: dis
                })
            }
        })
        
        return groups;
    }

    //Ngược lại, query dữ liệu các xã trong 1 huyện
    let District = initConnection().model("District");
    let ward = initConnection().model("Ward");
    let districtInfo = await District.findById(district);
    let wards = await ward.find({districtId: districtInfo.id});
    let groups = [];

    if (!wards){
        throw Error("Data is null!")
    }

    wards.forEach(ward => {
        let postsInfo = posts.filter(post => {
            return JSON.stringify(post.ward) === JSON.stringify(ward._id);
        });

        if (!postsInfo) {
            groups.push({
                data: [],
                area: ward
            })
        } else {
            groups.push({
                data: postsInfo,
                area: ward
            })
        }
    })
    
    return groups;
}

const groupDataForDate = (posts, startDate, endDate) => {
    //Format date from start to end
    let groupForDate = {};
    let dateOfStart = startDate.getDate();
    let monthOfStart = startDate.getMonth();
    let yearOfStart = startDate.getFullYear();
    let dateOfEnd = endDate.getDate();
    let monthOfEnd = endDate.getMonth();
    let yearOfEnd = endDate.getFullYear();

    for (let y = yearOfStart; y <= yearOfEnd; ++y) {
        let mStart = y === yearOfStart ? monthOfStart : 0;
        let mEnd = y < yearOfEnd ? 11 : monthOfEnd;

        for (let m = mStart; m <= mEnd; ++m){
            let dStart = m === mStart && y === yearOfStart ? dateOfStart : 1;
            let dEnd =  m === mEnd && y === yearOfStart ? dateOfEnd : 31 ;

            for (let d = dStart; d <= dEnd; ++d) {
                let dateNew = new Date(y, m, d);
                const date = `${dateNew.getDate()}-${dateNew.getMonth() + 1}-${dateNew.getFullYear()}`;
                groupForDate[date] = [];
            }
        }
    }
    
    //Dữ liệu có cùng ngày gom vào 1 object theo 1 key là date
    posts.forEach(post => {
        const {createdAt} = post;
        const date = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
        Array.isArray(groupForDate[date]) && groupForDate[date].push(post);
    });
  
    //Dữ liệu theo ngày trong 1 ngày gom vào 1 object
    const groupForDateArrays = Object.keys(groupForDate).map((date) => {
        return {
            date,
            post: groupForDate[date]
        };
    });

    return groupForDateArrays;
}

