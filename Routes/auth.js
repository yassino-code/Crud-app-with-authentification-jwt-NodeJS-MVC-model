const express = require('express');
const router = express.Router();
const {loggedin, loggedout} = require('../verifyToken')
const authController = require('../controllers/auth');

//authview
router.get("/",loggedout, (req, res) => {
res.render('auth')
});

//Signup using form
router.post("/signup",loggedout, authController.register);


//Login 
router.post("/login",loggedout, authController.login);



//profile
router.get("/profile", loggedin, authController.getprofile);




//Logout 
router.post("/logout", loggedin, authController.logout);

module.exports = router;