var config = require('../../config/database.config');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
//var mongo = require("mongoose");
var db = mongo.db(config.connectionString, { native_parser: true });





db.bind('users');
db.bind('books');
db.bind('tags');
db.bind('groups');
db.bind('Note');
db.bind('accounts');
var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getAllGroups = getAllGroups;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.createone = createone;
service.tagone = tagone;
service.groupone = groupone;
service.accountone = accountone;
module.exports = service;



function authenticate(username, password) {
    var deferred = Q.defer();
    console.log(username);
    db.Note.findOne({ username: username }, function (err, user) {
        console.log(user);
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && (password, user.password)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                //firstName: user.firstName,
                //lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
                //token: jwt.sign({ sub: user._id })
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}


function getAllGroups() {
    var deferred = Q.defer();

    db.groups.find().toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(groups);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function createone(userParam) {
    var deferred = Q.defer();

    // validation
    

    //function createUserOne() {
        // set user object to userParam without the cleartext password
        var user = (userParam);

        // add hashed password to user object
       // user.hash = bcrypt.hashSync(userParam.password, 10);

        db.books.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    //}

    return deferred.promise;
}

function tagone(userParam) {
    var deferred = Q.defer();

        var user = (userParam);
 db.tags.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    //}

    return deferred.promise;
}

function groupone(userParam) {
    var deferred = Q.defer();

    // validation
    db.groups.findOne(
        { groupname: userParam.groupname },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
               
                // username already exists
                deferred.reject('Group Name "' + userParam.groupname + '" isssssssssss already taken');
            } else {
                grouponee();
            }
        });

function grouponee() {
    var deferred = Q.defer();

        var user = (userParam);
 db.groups.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function accountone(userParam) {
    var deferred = Q.defer();

    // validation
    console.log(userParam);
    db.accounts.findOne(
        { accountname: userParam.accountname },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
               
                // username already exists
                deferred.reject('account Name "' + userParam.accountname + '" is already taken');
            } else {
                accountonee();
            }
        });

function accountonee() {
    var deferred = Q.defer();

        var user = (userParam);
 db.accounts.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" isssss already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}