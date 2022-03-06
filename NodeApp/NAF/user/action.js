const { initConnection } = require('../../helpers/dbHelpers');
const bcrypt = require('bcryptjs');
const { sendEmailRegisterUser, sendEmailActivedForUser } = require('../../helpers/emailHelpers');

exports.register = async (data) => {
    let User = initConnection().model("User");
    let { name, email, password } = data;

    let account = await User.findOne({
        email: email
    });
    if (account) {
        throw Error('account_existed')
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.create({
        ...data, password: hashPassword
    });

    try {
        await sendEmailRegisterUser(email, name);
    } catch (error){
        console.log(error);
    }
    return { user }
}

exports.updateUser = async (id, data, portal) => {
    let User = initConnection(portal).model("User");
    if (!data.avatar) {
        data.avatar = undefined;
    }
    const currentInfo = await User.findById(id);
    if (!currentInfo) {
        throw Error('user_is_not_existed');
    }
    if (data.role === 2 && currentInfo?.role === 1) {
        try {
            await sendEmailActivedForUser(currentInfo.email, currentInfo.name);
        } catch (error){
            console.log(error);
        }
    }
    let user = await User.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { user }
}

exports.getDetailUser = async (id, portal) => {
    let User = initConnection(portal).model("User");
    let user = await User.findById(id);
    if (!user) {
        throw Error('user_is_not_existed');
    }
    return { user }
}

exports.changePassword = async (id, data, portal) => {
    const { oldPassword, newPassword } = data;
    let User = initConnection(portal).model("User");
    let user = await User.findById(id);
    if (!user) {
        throw Error('user_is_not_existed');
    }
    let checkPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!checkPassword) {
        throw Error("Mật khẩu không đúng");
    }
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashPassword;
    user.save();
    return {user}
}

exports.getAllUsers = async (query, portal) => {
    let { page, limit, name, email, phone, role } = query;
    let option = {};

    //Set query data
    if (name) option.name = new RegExp(name, "i")
    if (email) option.email = new RegExp(email, "i")
    if (phone) option.phone = new RegExp(phone, "i")
    if (role) option.role = role
    
    let User = initConnection(portal).model("User");

    if (!page || !limit) {
        let allUsers = await User
            .find(option)
            .sort({createdAt: 'desc' })
        return {allUsers}
    } else {
        let allUsers = await User.paginate(option, {
            page,
            limit,
            sort: { 'createdAt': 'desc' }
        })
        return {allUsers}
    }
}

exports.deleteUser = async (id, portal) => {
    let User = initConnection(portal).model("User");
    let user = await User.findByIdAndDelete(id)
    return { user }
}

exports.getPostOwner = async (id, query, portal) => {
    let { page, limit } = query;
    //pagination posts in user
    let startIndex = limit * (page - 1);
    let endIndex = limit * page;
    
    let User = initConnection(portal).model("User");
    let user = await User
        .findById(id, { posts: { $slice: [ startIndex , endIndex ] } })
        .populate([{
            path: "posts", 
            select: "title status avatar createdAt price province district ward address",
            populate: [{
                path: "province",
            }, {
                path: "district",
            }, {
                path: "ward",
            }]
        }])

    let {posts} = await User.findById(id);
    if (!user) {
        throw Error('user_is_not_existed');
    }
    if (!posts) {
        throw Error('post_of_user_is_empty');
    }
    let totalDocs = posts?.length;
    let postsOwner = {
        docs: user.posts,
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        limit,
        page
    }
    return { postsOwner }
}