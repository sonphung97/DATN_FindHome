const { initConnection } = require('../../helpers/dbHelpers');

exports.createPostage = async (data) => {
    let Postage = initConnection().model("Postage");

    let postage = await Postage.create(data);

    return { postage }
}

exports.getAllPostages = async (query) => {
    let { limit, page, type } = query;
    let option = {};

    if (type) {
        option.type = type;
    }

    let Postage = initConnection().model("Postage");

    if (!page || !limit) {
        let allPostages = await Postage
            .find(option)
            .sort({ point: 1 })
        
        return {allPostages}
    } else {
        let allPostages = await Postage.paginate(option, {
            page,
            limit,
            sort: { point: 1 }
        })

        return { allPostages }
    }
}

exports.deletePostage = async (id) => {
    let Postage = initConnection().model("Postage");

    let postage = await Postage.findByIdAndDelete(id)

    return { postage }
}