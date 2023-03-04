const User = require('../Models/user');
const Group = require('../Models/Group');
const GroupChat = require('../Models/groupChat');
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

exports.creategroup = async(req,res) => {

    try {
        const {GroupName, GroupUsers} = req.body;
        const group = await Group.create({GroupName});
        console.log(GroupUsers);
        GroupUsers.forEach(async userid => {
            if(userid == req.user.id) await GroupChat.create({groupId: group.id, userId: userid, isAdmin: true})
            else await GroupChat.create({groupId: group.id, userId: userid, isAdmin: false})
        });

        res.status(230).json({sucess: true, msg: 'Group Successfully created'});
    }
    catch(err) {
        console.log(err);
    }
    
}

exports.getGroup = async (req,res) => {

    try {
        const groups = await req.user.getGroups({
        });
        res.status(231).json(groups);
    }
    catch(err) {
        console.log(err);
    }
}

exports.getusers = async (req,res) => {
    const users = await User.findAll({
        attributes: ['UserName', 'id']
    });
    res.status(210).json(users);
}