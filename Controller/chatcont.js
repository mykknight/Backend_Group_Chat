const Chat = require('../Models/msg');
const User = require('../Models/user');

exports.send_msg = async (req,res) => {
    
    try {
        const {Msg} = req.body;
        const data = await Chat.create({Msg, userId: req.user.id});
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
        const lastmsgid = Number(req.query.lsmsgid);
        console.log(lastmsgid);
        const users = await User.findAll({
            include: ['chats']
        })
        const chats = await Chat.findAll({
            attributes: ['id','userId', 'Msg'],
            offset: lastmsgid,
        });

        if(chats.length==0) return res.status(215).json(chats);

        let results = [];
        for(let i=0; i<chats.length; i++){
            for(let j=0; j<users.length; j++){
                if(chats[i].userId == users[j].id) {
                    results.push({
                        msgid: chats[i].id,
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