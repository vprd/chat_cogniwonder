// const log = console.log;
const log = () => { };
// db controller to save the messages
const dbController = require('../../model/controller');


// class to handle realtime message and pings when new message arrives
class ConversationHandler {

    constructor(io) {

        this.io = io;
        this.controller = dbController;
        this.conversations.bind(this)
        this.addconversation.bind(this)
        this.notifications.bind(this)
        this.notify.bind(this)
    }

    async conversations() {

        const allConversations = await dbController.listConversations();

        for (let conversation of allConversations) {
            const namespace = `/conversation${conversation.conversation_id}`;

            const conversationNamespace = this.io.of(namespace);
            log('created namespace: ', namespace);
            conversationNamespace.on('connection', socket => {
                log('connected')
                socket.on('message', async (message) => {
                    log('message recieved:', message)


                    if (message.message && message.sender && message.conversation_id) {


                        dbController.insertMessage(message).catch(e => {
                            conversationNamespace.emit('message', { ...message, error: e })
                            log(e);
                        })
                        conversationNamespace.emit('message', message);

                    } else {
                        this.io.emit('debug', 'some message prop didnt exist');
                    }
                });

            });
        }

    }
    addconversation(id, ids) {
        const namespace = `/conversation${id}`;
        log('created:', namespace);
        const conversationNamespace = this.io.of(namespace);

        conversationNamespace.on('connection', socket => {
            log('connected')
            socket.on('message', async (message) => {
                log(message)

                if (message.message && message.sender && message.conversation_id) {

                    conversationNamespace.emit('message', await dbController.insertMessage(message));
                }
            });
        });

        this.notify(ids, { event: 'newconversation' });
    }

    notify(ids, notification) {
        for (let id of ids) {
            const namespace = `/notification${id}`;

            const notificationnamespace = this.io.of(namespace);
            log(namespace, notification);
            notificationnamespace.emit('notification', notification);
        }
    }

    async notifications() {

        const alluserids = await dbController.getUserIDs();

        for (let id of alluserids) {
            const namespace = `/notification${id}`;

            const notificationnamespace = this.io.of(namespace);

            notificationnamespace.on('connection', socket => {
                log('useronline');
            });
        }

    }


}

module.exports = ConversationHandler;