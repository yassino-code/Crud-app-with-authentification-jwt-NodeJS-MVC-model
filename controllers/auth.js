

const mysqlConnection = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation')
const User =require("../models/user");
const cookieParser = require('cookie-parser');


exports.register = async (req,res,next)=>{
    var user = new User(req.body.Name,req.body.Email,req.body.Phone,req.body.Gender,req.body.Password);
     user.register(req,res);
     }
exports.login = async (req,res,next)=>{
   var user = new User(req.body.Name,req.body.Email,req.body.Phone,req.body.Gender,req.body.Password);
    user.login(req,res);
    }




     exports.getprofile =async (req,res,next)=>{
        
        token= req.cookies['auth-token']
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        // Passing the id to the next routes
       let theemail = decoded.email;




       // token= req.cookies['auth-token']
       // let theemail= jwt.decode(token);
        console.log(theemail);
      var user = new User(req.body.Name,req.body.Email,req.body.Phone,req.body.Gender,req.body.Password);
      user.getprofile(req,res);
                    }

exports.logout = (req, res) => {
    res.clearCookie('auth-token');
    res.json({'loggedout': "logged out"});
}