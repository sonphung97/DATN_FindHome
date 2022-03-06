const postageAction = require('./action');

exports.createPostage = async (req, res) => {
    try {
        let data = req.body;
        let newPostage = await postageAction.createPostage(data);
        res.status(201).json({
            success: true,
            messages: ["Tạo phí thành công!"],
            content: newPostage
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Tạo phí không thành công!"],
            content: error.message
        });
    }
}

exports.getAllPostages = async (req, res) => {
    try {
        let query = req.query;
        let allPostages = await postageAction.getAllPostages(query);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách phí thành công!"],
            content: allPostages
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách phí không thành công!"],
            content: error.message
        });
    }
}

exports.deletePostage = async (req, res) => {
    try {
        let id = req.params.id;
        let fee = await postageAction.deletePostage(id);
        res.status(201).json({
            success: true,
            messages: ["Xóa phí thành công!"],
            content: fee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa phí không thành công!"],
            content: error.message
        });
    }
}