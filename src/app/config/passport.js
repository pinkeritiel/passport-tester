var mongoose = require('mongoose');
var Member = require('../models/model.member');
//var members = require('../controllers/controller.member');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
module.exports = function (app) {
   //initialize passport
    passport.use(Member.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(Member.serializeUser());
    passport.deserializeUser(Member.deserializeUser());
 
    //need this according to passport guide
    app.use(cookieParser());
    app.use(session({
        secret: 'pickle',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};