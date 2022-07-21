const jwt = require('jsonwebtoken');

exports.loggedin= function (req, res, next){
    const token = req.cookies['auth-token'];
    if(!token) return res.redirect('/?error=' + encodeURIComponent('Access Denied'));

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.redirect('/?error=' + encodeURIComponent('Invalid Token'));
    }
}


 exports.loggedout = function (req, res, next){
    const token = req.cookies['auth-token'];
    if(!token){
next();
    }
    else if(token){
        return res.redirect('/view')
    }
}