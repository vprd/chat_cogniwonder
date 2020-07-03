const socketio = require('socket.io');

// db controller to save the messages
const dbController = require('../../model/controller');

// class to handle realtime message and pings when new message arrives
class ConversationHandler {

    constructor(server) {
        this.io = socketio(server);
        this.controller = dbController;
        this._setupNotificationSignaling();
    }

    conversations = async () => {

        console.log('starting listeners');
        const allConversations = await dbController.listConversations();

        for (let conversation of allConversations) {
            const namespace = `/conversation-${conversation.conversation_id}`;

            const conversationNamespace = this.io.of(namespace);

            conversationNamespace.on('connection', socket => {
                console.log('connected')
                socket.on('message', async (message) => {
                    console.log(message)

                    if (message.message && message.sender && message.conversation_id) {

                        conversationNamespace.emit('message', await dbController.insertMessage(message));
                    }
                });
            });
        }

    }
    addconversation = async (conversation) => {
        const namespace = `/conversation-${conversation.conversation_id}`;

        const conversationNamespace = this.io.of(namespace);

        conversationNamespace.on('connection', socket => {
            console.log('connected')
            socket.on('message', async (message) => {
                console.log(message)

                if (message.message && message.sender && message.conversation_id) {

                    conversationNamespace.emit('message', await dbController.insertMessage(message));
                }
            });
        });
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