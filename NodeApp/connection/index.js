const mongoose = require("mongoose");

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME}`
const optionConnectDB = process.env.DB_AUTHENTICATE === "true"
    ?
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
    }
    :
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };


const initDbConnection = () => {
    const db = mongoose.createConnection(uri, optionConnectDB);

    db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
    db.once("open", function () {
        console.log("Connect database successfully!");
    });
    return db;
};

module.exports = {
    initDbConnection
};