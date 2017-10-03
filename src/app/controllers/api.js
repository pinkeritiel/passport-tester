const express = require('express');
const router = express.Router();
var passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//var mongoose = require('mongoose');
var Member = require('../models/model.member');

MongoClient.Promise = global.Promise;
var configDB = require('../config/database.js');

// Connect
const connection = (closure) => {
//MongoClient.connect(configDB.url)
//  .then(() =>  console.log('connection succesful'))
//  .catch((err) => console.error(err));
   return MongoClient.connect(configDB.url, (err, db) => {
       if (err) return console.log(err);
       closure(db);
   });
};


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};
    router.post("/check", function(req, res) {
      console.log("check");
      req.logOut();
      res.send(200);
    });
// Get users
router.get('/users', (req, res) => {
    console.log('get users');
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("logging in by post with authentication in api.js");
    res.redirect('/');
});
    // handle logout
    router.post("/logout", function(req, res) {

      req.logOut();
      res.send(200);
    });

router.get('/register',(req,res)=> {
    var _username = req.query.name;
    var _password = req.query.password;
    console.log('finding  ' + _username + ' ' + _password);
    connection((db) => {
        db.collection('users')
            .findOne({name:_username,password:_password})

            .then((member) => {
               // response.data = users;
                //console.log('email response  ' + json.stringify(users));
                res.json(member);
            })
            .catch((err) => {
                console.log('dologin err ' + res);
                sendError(err, res);
            });
    });
});
router.post('/register', function(req, res) {
    Member.register(new Member({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/byemail',(req,res)=> {
    var _email = req.query.email;
    console.log('finding  ' + _email);
    connection((db) => {
        db.collection('users')
            .findOne({email:_email})

            .then((users) => {
               // response.data = users;
                //console.log('email response  ' + json.stringify(users));
                res.json(users);
            })
            .catch((err) => {
                console.log('email err ' + res);
                sendError(err, res);
            });
    });
});

router.post('/members/add', (req, res) => {
   const newname = req.body.name;
   console.log('/members/add  ' + newname);

   connection((db) => {
   db.collection('users')
   .insert(req.body, (err, result) => {
     if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
    });
});


module.exports = router;