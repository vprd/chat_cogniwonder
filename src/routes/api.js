const router = require('express').Router();
//const socketio = require('socket.io');
const dbController = require('../model/controller');
const Chat = require('./chat/sockets-handler');


module.exports = function (io) {

    // const socketListener = new ConversationHandler(io);
    // socketListener.conversations().then(() => socketListener.notifications());

    try {


        Chat(io)
        const conversations_socket = io.of('/conversations');
        conversations_socket.on('connection', socket => {

            socket.on('conversations', async data => {
                const user = await dbController.authorize(data.cookies);
                if (user) {
                    if (data.action === 'get') {
                        let convos = await dbController.getConversations(user.id);
                        async function updateActivity(convo) {
                            const data = (await dbController.getMessages(convo.conversation_id))
                            // const data = await api.getmessages(convo.conversation_id);
                            try {
                                convo.recent_activity =
                                    data.messages[data.messages.length - 1].date;
                            } catch (error) { }
                            return convo
                        }

                        if (convos) {
                            convos = await Promise.all(convos.map(convo => updateActivity(convo)))

                            /* for (let convo of convos) {
                                const data = (await dbController.getMessages(convo.conversation_id))
                                try {
                                    convo.recent_activity =
                                        data.messages[data.messages.length - 1].date;
                                } catch (error) { }
                            } */
                        }
                        socket.emit('update', convos)
                    } else if (data.action === 'changename') {

                        await dbController.setConversationName(data)
                        io.sockets.in('conversation' + data.conversation_id).emit('convo-update', { type: 'name', conversation_name: data.conversation_name })
                    }
                }
            })
        })

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

        router.post('/authenticate', autherize, async (req, res) => res.send(JSON.stringify(await dbController.authenticate(req.body))));

        router.post('/conversations', autherize, async (req, res) => {
            if (req.body.userid) {
                const conversations = await dbController.getConversations(req.body.userid);
                res.send(JSON.stringify(conversations));
            } else {

                res.send('[]');
            }
        });

        router.post('/messages', autherize, async (req, res) => {
            if (req.body.conversation_id && req.body.page >= 0) res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id, req.body.page)));
            else if (req.body.conversation_id) res.send(JSON.stringify(await dbController.getMessages(req.body.conversation_id)));
        });

        router.post('/sarch', async (req, res) => {
            res.send(JSON.stringify(await dbController.searchUsers(req.body)))
        });

        router.post('/nameconversation', async (req, res) => {

        });

        router.post('/search', async (req, res) => {
            res.send(JSON.stringify(await dbController.searchUsers(req.body)))
        });

        router.post('/startconversation', autherize, async (req, res) => {

            if (req.body.ids && req.body.creator) {
                const result = await dbController.createConversation(req.body.ids, req.body.creator)
                // socketListener.addconversation(result.insertId, req.body.ids);
                res.send(JSON.stringify(result))
            } else {
                res.sendStatus(400);
            }

        });
    } catch (error) {
        console.log(error)
    }
    return router;
}

async function autherize(req, res, next) {
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