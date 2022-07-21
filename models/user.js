
const mysqlConnection = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation')




class User {
    constructor(name,email,phone,gender,password) {
        this.valid = false;
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._gender = gender;
        this._password = password;
        
    }
 async register (req, res) {
    let emailExist = false;

    const {error} = registerValidation(req.body);
    console.log(req.body.Name)
    if(error) return res.redirect('/?error=' + encodeURIComponent(error.details[0].message));

    mysqlConnection.query(
        "SELECT * FROM user WHERE email = ?",
        [this._email], (err, rows, fields) => {
            
            (rows.length > 0) ? emailExist=true : emailExist=false;
        }
        
    );
    //salting
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this._email, salt);

    if(!emailExist){
        mysqlConnection.query(
            "INSERT INTO user (email, password, name, phone, gender) VALUES (?,?,?,?,?)",
            [this._email, hashedPassword,this._name,this._phone,this._gender], (err, rows, fields) => {
                !err ? res.redirect("/") : console.log(err);
            }
        );    
    }else{
        return res.redirect('/?error=' + encodeURIComponent('Email already exists!'));
    }
}
    
    async login (req, res)  {

        let user={};
    
        const {error} = loginValidation(req.body);
    //    console.log(this._email)
        if(error) return res.redirect('/?error=' + encodeURIComponent(error.details[0].message));
    
        mysqlConnection.query(
            "SELECT * FROM user WHERE email = ?",
            [this._email], (err, rows, fields) => {
                rows.length ? user=rows[0] : user={};
            }
            
        );
        
        const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
        await sleep(1000);
    
        if(!user.email) return res.redirect('/?error=' + encodeURIComponent('Email doesnot exists'));
    
        const validPass = await bcrypt.compare(this._password, user.password);
        if(!validPass) return res.redirect('/?error=' + encodeURIComponent('Invalid Password'));
    
        const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET);
    
        res.cookie('auth-token', token, { maxAge: 360000, httpOnly: true });
    
        res.redirect('/view');
        
    }



    getprofile(req,res){
        
        mysqlConnection.query("SELECT * FROM user where email=?",['yassine@gmail.com'], (err, rows, fields) => {
            !err ? res.render('profile', { data: rows }) : console.log(err);
        });
    } 
    


}

module.exports = User;