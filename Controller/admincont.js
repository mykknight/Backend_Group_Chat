const User = require('../Models/user');
const bcrypt = require('bcrypt');

exports.signup = async(req,res) => {

    try {
        const { UserName, Email, PhoneNo, Password } = req.body;
        const salt = 10;
        let user = await User.findAll({where: {Email: Email}});
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