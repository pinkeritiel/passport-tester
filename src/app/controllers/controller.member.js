
var mongoose = require("mongoose");
var passport = require("passport");
var Member = require('../models/model.member');
var memberController = {};


// Restrict access to root page
memberController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
memberController.register = function(req, res) {
  res.render('register');
};

// Post registration
memberController.doRegister = function(req, res) {
  Member.register(new Member({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
memberController.login = function(req, res) {
  res.render('login');
};

// Post login
memberController.doLogin = function(req, res) {
  console.log("In member controller for doLogin");
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
memberController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = memberController;

/*
exports.register = function (req, res) {
    console.log("registering: " + req.body.name + " "  + req.body.email);
    Member.register(new Member({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        cellphone: req.body.cellphone,
        gender: req.body.gender
    }), req.body.password, function (err, member) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            console.log("success registering");
            res.send({
                success: true,
                member: member
            });
        }
    });
};
 
exports.login = function (req, res, next) {
     console.log("login controller: " + req.body.username + " "  + req.body.password);

    Member.authenticate()(req.body.username, req.body.password, function (err, member, options) {
        if (err) return next(err);
        if (member === false) {
            console.log("Error in login " + options.message);
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(member, function (err) {
                console.log("successful logon");
                res.send({
                    success: true,
                    member: member
                });
            });
        }
    });
 
};
 
exports.getLogin = function (req, res) {
    console.log(req.member);
    if (req.member) {
 
        return res.send({
            success: true,
            member: req.member
        });
 
    } //res.send(500, {status:500, message: 'internal error', type:'internal'}); == deprecated
 
 
    res.send({
        success: false,
        message: 'not authorized'
    });
};

exports.create = function (req, res) {
    var member = new Member(req.body);
    console.log(member);
    member.save(function (err) {
        if (err) {
            return res.send({
                message: err
            });
        } else {
            res.send({
                success: true,
                member: member
            });
        }
    });
};

exports.list = function (req, res) {
    Member.find(function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json({
            success: true,
            member: data
        });
    });
};


exports.findOne = function (req, res) {
    Member.findOne({
        _id: req.params.id
    }, function (error, response) {
        if (error) {
            res.send(error);
        } else {
            res.send({
                success: true,
                member: response
            });
        }
    });
};

exports.findByName = function (req, res) {
    Member.findOne({
        name: req.params.name
    }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {
            res.send({
                success: true,
                member: response
            });
        }
    });
}
*/