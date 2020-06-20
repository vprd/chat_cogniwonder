const mysql = require('mysql');// mysql(would have still prefered mongodb)

const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '12345678',
    database: 'chatdb', //! Create this db before running
});

// TABLE NAME = conversations
// Table to store all conversations, conversation is a serialized array of all the conversations on the entire platform
function createConversationsTable() {
    query(`CREATE TABLE conversations (conversation_id INT AUTO_INCREMENT PRIMARY KEY, conversation TEXT)`);
}

// TABLE NAME = userconversation
// This table stores the conversations each user is a participant of
function createConversationsUserRelationTable() {
    query(`CREATE TABLE userconversation (user_id INT ,conversationids TEXT)`);
}

// TABLE NAME = messages
// Contains every message sent on the platform with all its properties
function createMessagedsTable() {
    query(`CREATE TABLE messages (message_id INT AUTO_INCREMENT PRIMARY KEY, sender_id INT, conversation_id INT, date DATETIME , message TEXT, props TEXT)`);
}

// this is just to make test usesrs
function addUser(username) {
    var sql = `INSERT INTO users (NAME) VALUES ('${username}')`;
    query(sql);
}

function query(sql) {
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}


//run this to setup all tables
function setUpTable() {
    createConversationsTable();
    createConversationsUserRelationTable();
    createMessagedsTable()
}


module.exports = () => {
    con.connect((err) => {

        if (err) throw err;
        console.log("db connection established");

    });

    return con;
}