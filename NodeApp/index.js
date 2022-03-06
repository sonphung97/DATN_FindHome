var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// import de su dung process.env cac bien global
require('dotenv').config();
require('./global');

// khoi tao models mac dinh cho db 
const { initModels } = require('./helpers/dbHelpers');
const models = require('./NAM');
initModels(CLIENT_CONNECTION, models);

// init routes
const user = require('./NAF/user/route');
const auth = require('./NAF/auth/route');
const country = require('./NAF/country/route');
const upload = require('./NAF/upload/route');
const postage = require('./NAF/postage/route');
const payment = require('./NAF/payment/route');
const category = require ('./NAF/category/route');
const post = require('./NAF/post/route');

var app = express();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use("/user", user);
app.use("/auth", auth);
app.use("/country", country);
app.use("/upload", upload);
app.use("/postage", postage);
app.use("/payment", payment);
app.use("/category", category);
app.use("/post", post);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at localhost:" + port);
});


// CHECK OUTDATE POSTAGE 
const checkOutdateRequest = {
    port,
    path: '/post/check-outdated-postage',
    method: 'PATCH'
};

setInterval(() => {
    http.request(checkOutdateRequest, function(res) {
        res.on('data', function () {});
      }).end();
}, 3600000);

