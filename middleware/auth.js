const User = require('../Models/user');
const jwt = require('jsonwebtoken');

exports.authentication = (req,res,next) => {
    try {
        const token = req.header("Authorization");
        console.log(token);
        const user = jwt.verify(token, '23102000');
        User.findByPk(user.userId)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            throw new Error(err);
        }) 
    }
    catch(err) {
        console.log(err);
        res.status(405).json({sucess: false, msg: 'not authorized'});
    }
}