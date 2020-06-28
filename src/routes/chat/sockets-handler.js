const socketio = require('socket.io');

// db controller to save the messages
//const dbController = require('../../model/controller');
const controller = require('../../mongo/controller');

// class to handle realtime message and pings when new message arrives
class ConversationHandler {

    constructor(server) {
        this.io = socketio(server);
        /* this.controller = dbController; */
        this.controller = controller;
    }

    conversations = async () => {

        console.log('starting listeners');
        //const allConversations = await dbController.listConversations();
        const allConversations = await controller.geteveryconversations();

        for (let conversation of allConversations) {
            console.log('listening on:',conversation);
            const namespace = `/conversation-${conversation._id}`;

            const conversationNamespace = this.io.of(namespace);

            conversationNamespace.on('connection', socket => {
                console.log('connected')
                socket.on('message', async (message) => {
                    console.log(message)
                    conversationNamespace.emit('message', await controller.insertMessage(message));
                });
                conversationNamespace.emit('conversation-update','update');

            });
        }

    }

    _setupNotificationSignaling = () => {

        // !DO NOT ADD A LISTENER ON io
        const notifications = this.io.of('/notifications');

        /* notifications.on('connection', socket => {
            //! IN PROGRESS
            socket.on('conversations', conversations => {
                
                conversations.forEach(conversationID => {
                    socket.on('conversation:' + conversationID, message => {
                        socket.broadcast.emit('conversation:' + conversationID, message);
                    });
                });

            });
        }); */
    }

}

module.exports = ConversationHandler;