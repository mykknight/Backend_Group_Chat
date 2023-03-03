const Chat = require('../Models/msg');
const User = require('../Models/user');
const Groupchat = require('../Models/groupChat');

exports.send_msg = async (req,res) => {
    
    try {
        const {Msg} = req.body;
        const groupId = req.params.grpid;
        const userId = req.user.id;
        await Chat.create({Msg, userId, groupId});
        res.status(225).json({success: true, msg: 'Chat delivered'});
    }
    catch(err) {
        console.log(err);
    }
}



exports.getGroupchat = async(req,res) => {
    const groupId = req.params.grpid;

    
    const chats = await Chat.findAll({
        where: {groupId},
        attributes: ['Msg', 'userId']
    });

    res.status(233).json({chats: chats});
}