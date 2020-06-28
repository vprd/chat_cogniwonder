const { UserModel, MessagesModel, ConversationsModel } = require('./db');

const controller = {

    joinuser: async function (username, id) {

        let user = await UserModel.findOne({ username, id });
        if (!user) {
            const newuser = new UserModel({ username, id, conversations: [] });

            await newuser.save();
            user = newuser;

        }

        //let group = await ConversationsModel.findOne({ conversation_name: 'My class' });
        const alluserdocs = await UserModel.find({});
        const allusers = [...(new Set(alluserdocs.map(u => u.username)))];

        /* if (allusers.length > 1) {
            if (!group) {
                group = new ConversationsModel({ conversation: [...allusers], conversation_name: 'My class' });
                await group.save();
            } else {
                await ConversationsModel.findByIdAndUpdate(group._id, { conversation: [...allusers] });
            }
        } */

        const otherusers = alluserdocs.filter((u) => user.username !== u.username);

        for (let otheruser of otherusers) {
            console.log('going to request convo between', user.username, otheruser.username, 'from', otherusers);
            await this.createConversation([user.username, otheruser.username].sort());
        }

        await this.createConversation(allusers, 'My class');




        return await UserModel.findOne({ username, id })

        /* const user = (await UserModel.find({ username }))[0];
        if (user) {
            return user
        } else {
            const newuser = new UserModel({ username, conversations: [], id });
            await newuser.save();

            const users = await UserModel.find({});


            for (let u of users) {
                if (u.id !== newuser.id) {
                    console.log([newuser.id, u.id], [newuser.id, u.id].length)
                    await this.createConversation([newuser.id, u.id])
                }
            }


            let group = await ConversationsModel.findOne({ conversation_name: 'My class' });
            const allusers = (users).map(u => u.username);
            if (!group) {
                group = new ConversationsModel({ conversation: allusers, conversation_name: 'My class' });
                await group.save();
            } else {
                await ConversationsModel.findByIdAndUpdate(group._id, { conversation: allusers });
            }

            return newuser
        } */
    },

    createConversation: async function (users, conversation_name) {

        console.log('requesting convo of ', users);
        if (users.length > 1) {

            const conversation_check = conversation_name && await ConversationsModel.findOne({ conversation_name });

            if (conversation_check && typeof (conversation_check) !== 'string') {

                await ConversationsModel.findOneAndUpdate({ conversation_name }, { conversation: users });
                console.log('updated the convo ', conversation_name);
            } else {
                const check = await ConversationsModel.findOne({ conversation: users });
                if (check) {
                    if (typeof (conversation_check) === 'string') {
                        await ConversationsModel.findOneAndUpdate({ _id: check._id }, { conversation_name });
                        console.log('found a convo with same members updating that name to:', conversation_name)
                    } else {
                        console.log('convo already exists ');
                    }
                } else {
                    await ConversationsModel.create({ conversation: users, conversation_name });
                    console.log('made conversation of ', users);
                }
            }


            const conversation = await ConversationsModel.findOne({ conversation_name }) || await ConversationsModel.findOne({ conversation: users });

            for (let username of users) {
                const user = await UserModel.findOne({ username });
                if (user) {
                    //console.log(username, [...(new Set([...user.conversations, conversation._id]))]);
                    await UserModel.findByIdAndUpdate(user._id, { conversations: [...(new Set([...user.conversations, String(conversation._id)]))] })
                }
            }



        } else {
            console.log('not created cuz no other user exists');
        }


        /*  if (Array.isArray(userids)) {
             if (userids.length > 1) {
                 let validusers = new Set();
                 let validusersids = new Set();
 
                 for (let id of userids) {
 
                     const user = (await UserModel.find({ id }))[0];
                     console.log(user)
                     if (user) {
                         validusers.add(user.username);
                         validusersids.add(user.id);
                     }
                 }
                 console.log(validusersids, validusers);
                 validusers = [...validusers];
                 validusersids = [...validusersids];
                 if (await ConversationsModel.find({ conversation: validusers })) {
                     return
                 }
                 const conversation = new ConversationsModel({ conversation: validusers })
                 await conversation.save();
                 for (let id of validusersids) {
                     const user = await UserModel.findOne({ id });
                     user.conversations.push(conversation._id);
                     await UserModel.findOneAndUpdate({ id }, { conversations: user.conversations });
 
                 }
                 return conversation
 
 
             }
 
         } else {
             throw new Error('that not an array its ' + userids);
         } */
    },
    getallconversations: async function (id) {

        const user = await UserModel.findOne({ id })
        console.log('www',user,id)
        if (!user) throw new Error('No such user found');
        let conversations = [];
        for (let conversation_id of user.conversations) {
            const conversation = await ConversationsModel.findById(conversation_id);
            if (conversation) {
                conversations.push(conversation);
            } else {
            }
        }
        return conversations;
    },
    geteveryconversations: async function () {

        const conversations = await ConversationsModel.find({});
        return conversations;
    },

    insertMessage: async function (message) {
        
        if (message && message.message && message.sender && message.conversation_id) {
            const date = message.date || new Date();
            message.date = date;
            const newmessage = new MessagesModel(message);
            await newmessage.save();
            return message;
        } else {
            throw new Error('something is missing in' + message);
        }
    },
    getmessages: async function (conversation_id) {
    console.log("conversation_id", conversation_id)
        
        if (typeof (conversation_id) === 'string') {
            const messages = await MessagesModel.find({conversation_id});
            console.log("conversation", messages)
            if (messages) {
                return messages
            } else {
                throw new Error('no such conversation ' + conversation_id);
            }
        } else {
            throw new Error('needs conversation_id as string but got ' + conversation_id);
        }
    },
    _deleteallconvos: async function () {
        await ConversationsModel.deleteMany({});
    },
    _deleteallusers: async function () {
        await UserModel.deleteMany({});
    },
    _deleteallmessages: async function () {
        await MessagesModel.deleteMany({});
    },
    _deleteall: async function () {
        console.time();
        await Promise.all([this._deleteallconvos(), this._deleteallmessages(), this._deleteallusers()]);
        console.timeEnd();
    }

}
// controller._deleteall()
module.exports = controller;