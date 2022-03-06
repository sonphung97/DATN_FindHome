exports.initModels = (connection, models) => {
    const arrayKeys = Object.keys(models);
    arrayKeys.forEach(key => {
        global[key] = connection.model(key);
    });
}

exports.initConnection = () => {
    const db = CLIENT_CONNECTION.useDb();
    return db;
}