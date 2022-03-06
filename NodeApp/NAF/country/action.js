const { initConnection } = require('../../helpers/dbHelpers');

exports.getProvinces = async () => {
    let Province = initConnection().model("Province");

    let provinces = await Province.find({});
    return { provinces }
}

exports.getDistricts = async (query) => {
    let option = query;

    let District = initConnection().model("District");

    let districts = await District.find(option);
    return { districts }
}

exports.getWards = async (query) => {
    const option = query;
        
    let Ward = initConnection().model("Ward");

    let wards = await Ward.find(option);
    return { wards }
}

