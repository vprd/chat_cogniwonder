const router = require('express').Router();
//const socketio = require('socket.io');
const dbController = require('../model/controller');
const ConversationHandler = require('./chat/sockets-handler');
module.exports = (server) => {

    const socketListener = new ConversationHandler(server);

    router.post('/authenticate', async (req, res) => {
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
    });

    router.post('/conversations', async (req, res) => {
        if (req.body.userid) {
            const conversations = await dbController.getConversations(req.body.userid);
            console.log(conversations)
            res.send(JSON.stringify(conversations));
        } else {
            console.log(req.body)
            res.send('[]');
        }
    });

    router.post('/messages', async (req, res) => {
        console.log(await dbController.getMessages(req.body.conversation_id))
        if (req.body.conversation_id) res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id)));
    });

    router.post('/search', async (req, res) => {

        res.send(JSON.stringify(await dbController.searchUsers(req.body)))
    });

    router.post('/startconversation', async (req, res) => {

        /* console.log(req.body.ids)
        res.send('OK'); */

        if (req.body.ids) {
            const conversation = await dbController.createConversation(req.body.ids)
            socketListener.addconversation(conversation);
            res.send(JSON.stringify(conversation))
        } else {
            res.sendStatus(400);
        }

    });



    //socket io setup

    socketListener.conversations();

    return router;
}