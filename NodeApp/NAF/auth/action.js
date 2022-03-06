const { initConnection } = require('../../helpers/dbHelpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (data) => {
    let User = initConnection(data.portal).model("User");

    let user = await User.findOne({
        email: data.email
    });

    if (!user) {
        throw Error("Account is not existing");
    }

    let checkPassword = bcrypt.compareSync(data.password, user.password);
    if (!checkPassword) {
        throw Error("Password is invalid");
    }
    let payload = {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
    }
    
    let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 99999999 });

    return {
        token,
        user: {
            _id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }
    }
}