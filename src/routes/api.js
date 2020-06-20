const router = require('express').Router();
const socketio = require('socket.io');

console.log(router)


module.exports = (server) => {

    const io = socketio(server);
    
    io.on('connection', () => {
        console.log('connected');
    });

    return router;
}