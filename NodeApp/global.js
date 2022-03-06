const { initDbConnection } = require('./connection');
global.CLIENT_CONNECTION = initDbConnection();

global.FOLDER_UPLOAD = __dirname + '/uploads/'