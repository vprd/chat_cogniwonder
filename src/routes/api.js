const router = require('express').Router();

const dbController = require('../model/controller');
// const controller = require('../mongo/controller');

const ConversationHandler = require('./chat/sockets-handler');

module.exports = (server) => {

    router.post('/authenticate', async (req, res) => {
        console.log('authenticate:', req.body);
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
        res.send("SSD");
    });

    router.get('/authenticate', async (req, res) => {
        console.log(req.query);
        // res.send(JSON.stringify(await controller.joinuser(req.query.username, req.query.id)))
    });

    router.post('/conversations', async (req, res) => {
        console.log('conversations:', req.body)
        
        /* if (req.body.userid) {
            const conversations = await dbController.getConversations(req.body.userid);
            console.log(conversations)
            res.send(JSON.stringify(conversations));
        } else {
            res.send('INVALID USERID');
        } */

       res.send(JSON.stringify(await controller.getallconversations(req.body.id)));

    });

    router.post('/messages', async (req, res) => {
        console.log('messages:', req.body)
        /* console.log(await dbController.getMessages(req.body.conversation_id))
        if(req.body.conversation_id )res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id))); */

        res.send(JSON.stringify(await controller.getmessages(req.body.conversation_id)));
    });

    //socket io setup
    const socketListener = new ConversationHandler(server);
    socketListener.conversations();

    return router;
}