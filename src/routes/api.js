const router = require('express').Router();
const socketio = require('socket.io');
const dbController = require('../model/controller');
const chat = require('./chat/sockets-handler');
module.exports = (server) => {

    router.post('/authenticate', async (req, res) => {
        console.log(req.body);
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
    });

    router.post('/conversations', async (req, res) => {
        if (req.body.userid) {
            const conversations = await dbController.getConversations(req.body.userid);
            
            res.send(JSON.stringify(conversations));
        } else {
            res.send('INVALID USERID');
        }
    });

    const io = socketio(server);

    io.on('connection', () => {
        console.log('connected');
    });

    return router;
}