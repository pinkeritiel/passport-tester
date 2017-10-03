var express = require('express');
var router = express.Router();
//var auth = require("../controllers/AuthController.js");
var members = require('../controllers/controller.member');
// restrict index for logged in user only
router.get('/', members.home);

// route to register page
router.get('/register', members.register);

// route for register action
router.post('/register', members.doRegister);

// route to login page
router.get('/login', members.login);

// route for login action
router.post('/login', members.doLogin);

// route for logout action
router.get('/logout', members.logout);

router.get('/dashboard', function(req, res) {
    res.send('im the dashboard page!');  
});

router.get('/home', function(req, res) {
    res.send('im the home page!'); 
});

module.exports = router;