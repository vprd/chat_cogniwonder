const router = require('express').Router();
//const socketio = require('socket.io');
const dbController = require('../model/controller');
const ConversationHandler = require('./chat/sockets-handler');


module.exports = (io) => {
    console.log("===================================");
    const socketListener = new ConversationHandler(io);
    socketListener.conversations().then(() => socketListener.notifications());
    console.log("=====================sss==============");

    router.get('/benchmarkserial', async (req, res) => {
        console.time('serial')
        res.send(JSON.stringify(await dbController.sequentialget()))
        console.timeEnd('serial')
    })
    router.get('/benchmarkparallel', async (req, res) => {
        console.time('parellel')
        res.send(JSON.stringify(await dbController.parallelget()))
        console.timeEnd('parellel')
    })

    router.post('/authenticate', authenticate, async (req, res) => {
        console.log("============auth");
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
    });

    router.post('/conversations', authenticate, async (req, res) => {
        if (req.body.userid) {
            const conversations = await dbController.getConversations(req.body.userid);

            res.send(JSON.stringify(conversations));
        } else {

            res.send('[]');
        }
    });

    router.post('/messages', authenticate, async (req, res) => {

        if (req.body.conversation_id && req.body.page >= 0) res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id, req.body.page)));
        else if (req.body.conversation_id) res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id)));

    });

    router.post('/search', async (req, res) => {
        res.send(JSON.stringify(await dbController.searchUsers(req.body)))
    });

    router.post('/startconversation', authenticate, async (req, res) => {
            console.log(req.body);
        if (req.body.ids && req.body.creator) {
            res.send('Req Received');
            const result = await dbController.createConversation(req.body.ids, req.body.creator)
            socketListener.addconversation(result.insertId, req.body.ids);
            res.send(JSON.stringify(result))
        } else {
            res.sendStatus(400);
        }

    });

    //socket io setup

    return router;
}

async function authenticate(req, res, next) {
    // console.log(req.body.cookies);
    if (req.body.cookies) {
        const user = await dbController.authorize(req.body.cookies);
        if (user) {
            req.user = user;
            next();
        } else {
            res.sendStatus(401);
        }
    }
}