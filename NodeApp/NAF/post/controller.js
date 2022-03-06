const postAction = require('./action');

exports.createNewPost = async (req, res) => {
    try {
        let data = req.body;
        let newPost = await postAction.createPost(data, req.user);
        res.status(201).json({
            success: true,
            messages: ["Đăng bài thành công!"],
            content: newPost
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Bài đăng chưa được thêm!"],
            content: error.message
        });
    }
}

exports.getAllPost = async (req, res) => {
    try {
        let query = req.query;
        let allPosts = await postAction.getAllPosts(query);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách bài đăng thành công!"],
            content: allPosts
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách bài đăng không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailPost = async ( req, res ) => {
    try {
        let id = req.params.id;
        let post = await postAction.getDetailPost( id)
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.getPostForUpdate = async ( req, res ) => {
    try {
        let id = req.params.id;
        let post = await postAction.getPostForUpdate( id, req.user._id)
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: error.message === "you_can_not_access" ?
            ["Bạn không có quyền truy cập!"] :
            ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.updatePost = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postAction.updatePost( id, data)
        res.status(200).json({
            success: true,
            messages: ["Cập nhật bài đăng thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Cập nhật bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.deletePost = async ( req, res ) => {
    try {
        let postId = req.params.id;
        let post = await postAction.deletePost( postId, req.user._id)
        res.status(200).json({
            success: true,
            messages: ["Xóa bài đăng thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.comment = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postAction.comment( id, data)
        res.status(200).json({
            success: true,
            messages: ["Bình luận bài viết thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Bình luận bài viết không thành công"],
            content: error.message
        });
    }
}

exports.rate = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postAction.rate( id, data)
        res.status(200).json({
            success: true,
            messages: ["Đánh giá bài viết thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Đánh giá bài viết không thành công"],
            content: error.message
        });
    }
}

exports.follow = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postAction.follow( id, data)
        res.status(200).json({
            success: true,
            messages: ["Cập nhật theo dõi bài viết thành công"],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Theo dõi bài viết không thành công"],
            content: error.message
        });
    }
}

exports.checkOutDatedPostage = async ( req, res ) => {
    try {
        let info = await postAction.checkOutDatedPostage()
        res.status(200).json({
            success: true,
            messages: ["Đã kiểm tra"],
            content: info
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Đã xảy ra lỗi trong quá trình kiểm tra"],
            content: error.message
        });
    }
}

exports.getDashboardData = async ( req, res ) => {
    try {
        let data = await postAction.getDashboardData(req.query)
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu thành công"],
            content: data
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu không thành công"],
            content: error.message
        });
    }
}