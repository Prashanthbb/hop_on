var express = require('express');
var bodyParser = require('body-parser');

const multer = require('multer');

var Product = require('./routes/product.routes');

var app = express();
var path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Product);

var port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
