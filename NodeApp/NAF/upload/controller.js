const uploadAction = require('./action');

exports.uploadMultiImages = async (req, res) => {
    try {
        let files = req.files;
        let folder = req.body.folder;

        let imageLinks = await uploadAction.uploadMultiImages(files, folder);
        res.status(201).json({
            success: true,
            messages: ["Đăng ảnh thành công"],
            content: imageLinks
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Ảnh chưa thể đăng"],
            content: error.message
        })
    }
}