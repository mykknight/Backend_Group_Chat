const Chat = require('../Models/msg');
const User = require('../Models/user');


exports.send_msg = async (req,res) => {
    
    try {
        const {Msg} = req.body;
        console.log(Msg);
        const data = await Chat.create({Msg, Name: req.user.UserName, userId: req.user.id});
        res.status(220).json({data: data.Msg, user: req.user});
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_msg = async(req,res) => {

    try {
        // const chats = await Chat.findAll({
        //     attributes: ['Name', 'Msg']
        // })
        const users = await User.findAll({
            include: ['chats']
        })
        const chats = await Chat.findAll({
            attributes: ['userId', 'Msg']
        });
        var results = [];
        for(let i=0; i<chats.length; i++){
            for(let j=0; j<users.length; j++){
                if(chats[i].userId == users[j].id) {
                    results.push({
                        name: users[j].UserName,
                        message: chats[i].Msg
                    })
                }
            }
        }
        res.status(215).json(results);
     
    }
    catch(err) {
        console.log(err);
    }
}