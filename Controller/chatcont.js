const Chat = require('../Models/msg');
const User = require('../Models/user');


exports.send_msg = async (req,res) => {
    
    try {
        const {Msg} = req.body;
        console.log(Msg);
        const data = await Chat.create({Msg, userId: req.user.id});
        res.status(220).json({data: data.Msg, user: req.user});
    }
    catch(err) {
        console.log(err);
    }
}