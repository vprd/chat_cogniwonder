const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb+srv://chat:chat@cluster0-xwm5y.mongodb.net/chatdb?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('database connected'));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    id: String,
    conversations: [String]
});
const MessagesSchema = new Schema({
    message: String,
    date: Date,
    sender: String,
    conversation_id: String,
});

const ConversationSchema = new Schema({
    conversation: [String],
    conversation_name: String,
});



const UserModel = mongoose.model('users', UserSchema);
const MessagesModel = mongoose.model('messages', MessagesSchema);
const ConversationsModel = mongoose.model('conversations', ConversationSchema);

module.exports = { UserModel, MessagesModel, ConversationsModel };

