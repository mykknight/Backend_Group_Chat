const User = require('../Models/user');
const Group = require('../Models/Group');
const GroupChat = require('../Models/groupChat');

exports.getGroupdetails = async(req,res) => {

    const groupid = req.params.grpid;

    const group = await Group.findByPk(groupid);

    const members = await group.getUsers();

    res.status(233).json(members);
    
}

exports.makeadmin = async(req,res) => {

    try {
        const userid = req.params.userid;
        const grpid = req.query.grpid;

        const grpchat = await GroupChat.findAll({
            where: {groupId: grpid, userId: userid}
        })

        grpchat[0].update({ isAdmin: true})
        .then(() => {
            res.status(237).json({ss: true});
        })
        .catch(err => {
            throw new Error(err)
        })
    }
    catch(err) {
        console.log(err);
    }
    

}

exports.removeuser = async(req,res) => {

    try {
        const userid = req.params.userid;
        const grpid = req.query.grpid;
        await GroupChat.destroy({
            where:{groupId: grpid, userId: userid}
        })
        res.status(238).json({sucess: true});
    }
    catch(err) {
        console.log(err);
    }
}

exports.adduser = async(req,res) => {

    try {
        const {userId, groupId} = req.body;
        await GroupChat.create({groupId, userId, isAdmin: false});
        res.status(216).json({sucess: true});
    }
    catch(err) {
        console.log(err);
    }
}