const userAction = require('./action');

exports.register = async (req, res) => {
    try {
        let user = await userAction.register(req.body);
        res.status(201).json({
            success: true,
            messages: ["Tạo tài khoản thành công"],
            content: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: error.message === "account_existed" ?
                ["Tài khoản đã tồn tại"] :
                ["Tạo tài khoản không thành công"],
            content: error.message
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let query = req.query;
        let allUsers = await userAction.getAllUsers(query, req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách thành công!"],
            content: allUsers
        });
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailUser = async ( req, res ) => {
    try {
        let id = req.params.id;
        let user = await userAction.getDetailUser( id, req.portal)
        res.status(200).json({
            success: true,
            messages: ["Lấy thông tin thành công"],
            content: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy thông tin không thành công"],
            content: error.message
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let user = await userAction.updateUser( id, data, req.portal);
        res.status(200).json({
            success: true,
            messages: ["Cập nhật thành công"],
            content: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Cập nhật không thành công"],
            content: error.message
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        let id = req.params.id;
        data = req.body;
        let user = await userAction.changePassword( id, data, req.portal);
        res.status(200).json({
            success: true,
            messages: ["Mật khẩu đã được thay đổi, vui lòng đăng nhập lại!"],
            content: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thay đổi mật khẩu không thành công"],
            content: error.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let portal = req.portal;
        let user = await userAction.deleteUser(id, portal);
        res.status(201).json({
            success: true,
            messages: ["Xóa tài khoản thành công!"],
            content: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa tài khoản không thành công!"],
            content: error.message
        });
    }
}

exports.getPostOwner = async (req, res) => {
    try {
        let id = req.params.id;
        let query = req.query;
        let postsOwner = await userAction.getPostOwner( id, query, req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách thành công!"],
            content: postsOwner
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách bài đăng không thành công"],
            content: error.message
        });
    }
}