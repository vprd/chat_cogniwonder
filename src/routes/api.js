const router = require('express').Router();
const socketio = require('socket.io');
const dbController = require('../model/controller');
const chat = require('./chat/sockets-handler');
module.exports = (server) => {

    router.post('/authenticate', async (req, res) => {
        console.log(req.body);
        res.send(JSON.stringify(await dbController.authenticate(req.body)));
    });

    router.post('/conversations',async (req,res)=>{

        console.log(req.body);

    })

    const io = socketio(server);

    io.on('connection', () => {
        console.log('connected');
    });

    return router;
}