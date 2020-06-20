const socketio = require('socket.io');
const dbController = require('../../model/controller');

class ConversationHandler {

    constructor(server) {
        this.io = socketio(server);
        this.controller = dbController;
        this._setupNotificationSignaling();
    }

    _setupNotificationSignaling = () => {
        const notifications = this.io.of('/notifications');

        notifications.on('connection', socket => {
            socket.on('conversations', conversations => {

                conversations.forEach(conversationID => {
                    socket.on('conversation:' + conversationID, message => {
                        socket.broadcast.emit('conversation:' + conversationID, message);
                    });
                });

            });
        });
    }

}

module.exports = ConversationHandler;