const router = require('express').Router();
//const socketio = require('socket.io');
const dbController = require('../model/controller');
const ConversationHandler = require('./chat/sockets-handler');


module.exports =  (io) => {



    const socketListener = new ConversationHandler(io);
     socketListener.conversations();
     socketListener.notifications();

    router.post('/authenticate', async (req, res) => {
        console.log(req.body)
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
    });

    router.post('/conversations', async (req, res) => {
        if (req.body.userid) {
            const conversations = await dbController.getConversations(req.body.userid);

            res.send(JSON.stringify(conversations));
        } else {

            res.send('[]');
        }
    });

    router.post('/messages', async (req, res) => {
        if (req.body.conversation_id) res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id)));
    });

    router.post('/search', async (req, res) => {

        res.send(JSON.stringify(await dbController.searchUsers(req.body)))
    });

    router.post('/startconversation', async (req, res) => {

        /* console.log(req.body.ids)
        res.send('OK'); */

        if (req.body.ids) {
            const result = await dbController.createConversation(req.body.ids)
            socketListener.addconversation(result.insertId, req.body.ids);
            res.send(JSON.stringify(result))
        } else {
            res.sendStatus(400);
        }

    });

    //socket io setup

    return router;
}