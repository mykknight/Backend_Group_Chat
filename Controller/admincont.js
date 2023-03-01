const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res) => {

    try {
        const { UserName, Email, PhoneNo, Password } = req.body;
        const salt = 10;
        let user = await User.findAll({where: {Email}});
        if(user[0]) return res.status(400).json({sucess: false, msg: 'User Already Exist'});
        bcrypt.hash(Password, salt, async (err, hash) => {
            if(err) console.log(err);
            await User.create({ UserName, Email, PhoneNo, Password: hash});
            res.status(201).json({sucess: true, msg: 'User Sucessfully SignUP'});
        })
    }
    catch(err) {
        console.log(err);
    }
}

exports.login = async(req,res) => {

    function GenAccessToken(id,name) {
        return jwt.sign({userId: id, name: name}, '23102000');
    }

    try {
        const { Email, Password } = req.body;
        let user = await User.findAll({where: {Email}});
        if(user[0]) {
            bcrypt.compare(Password, user[0].Password, (err, output) => {
                if(err) return res.status(500).json({sucess: false, msg: 'Something went wrong'});
                else{
                    if(output==true){
                        return res.status(210).json({sucess: true, msg: 'User Successfully Login', token: GenAccessToken(user[0].id,user[0].UserName), person: user[0].UserName});
                    }
                    else res.status(401).json({sucess: false, msg: 'Password is incorrect'});
                }
            });
        }
        else res.status(404).json({sucess: false, msg: 'User not Found'});
    }
    catch(err) {
        console.log(err);
    }
}