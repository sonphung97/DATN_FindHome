const authAction = require('./action');

exports.login = async (req, res) => {
    try {
        let userLogin = await authAction.login(req.body);

        res.status(200).json({
            success: true,
            messages: ["Đăng nhập thành công"],
            content: userLogin
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Email hoặc mật khẩu không đúng"],
            content: error.message
        });
    }
}