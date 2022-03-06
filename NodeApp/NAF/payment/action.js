const { initConnection } = require('../../helpers/dbHelpers');

exports.createPayment = async (data, user) => {
    let Payment = initConnection().model("Payment");
    let User = initConnection().model("User");
    let userInfo = await User.findById(user._id);
    if (!userInfo) {
        throw Error("Không tìm thấy người dùng")
    }
    let payment = await Payment.create({ ...data, owner: user._id });
    if (payment.type === 1) {
        userInfo.balance += payment.transaction;
    }
    if (payment.type === 2) {
        userInfo.balance -= payment.transaction;
    }
    await userInfo.save();
    return { payment }
}

exports.getAllPayments = async (query, user) => {
    let { limit, page, type } = query;
    let option = {};
    if (user) {
        option.owner = user._id;
    }
    if (type) {
        option.type = type;
    }
    let Payment = initConnection().model("Payment");
    if (!page || !limit) {
        let allPayments = await Payment
            .find(option)
            .populate([{
                path: "post", select: 'title'
            }])
            .sort({ createdAt: 'desc' })
        return {allPayments}
    } else {
        let allPayments = await Payment.paginate(option, {
            page,
            limit,
            populate: [{
                path: "post", select: 'title'
            }],
            sort: { 'createdAt': 'desc' }
        })
        return {allPayments}
    }
}