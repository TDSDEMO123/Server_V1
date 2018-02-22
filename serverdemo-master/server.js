require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
//var config = require('config.json');
var config = require('../serverdemo-master/config/database.config');




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use JWT auth to secure the api, the token can be passed in the authorization header or querystring

app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register','/users/registerone','/users/tag','/users/group','/users/account','/users/groups'] }));



// routes
app.use('/users', require('../serverdemo-master/app/controllers/users.controller'));
//app.use(require('./routes/api'));

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

// start server
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});