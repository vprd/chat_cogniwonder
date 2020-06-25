const router = require('express').Router();
//const socketio = require('socket.io');
const dbController = require('../model/controller');
const ConversationHandler = require('./chat/sockets-handler');
module.exports = (server) => {

    router.post('/authenticate', async (req, res) => {
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
    });

    router.post('/conversations', async (req, res) => {
        if (req.body.userid) {
            const conversations = await dbController.getConversations(req.body.userid);
            console.log(conversations)
            res.send(JSON.stringify(conversations));
        } else {
            res.send('INVALID USERID');
        }
    });

    router.post('/messages', async (req, res) => {
        req.body.conversation_id && res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id)));
    });

    //socket io setup
    const socketListener = new ConversationHandler(server);
    socketListener.conversations();

    return router;
}