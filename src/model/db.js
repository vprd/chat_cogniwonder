const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '12345678',
    database: 'chatdb',

});

function createConversationsTable() {
    query(`CREATE TABLE conversations (conversation_id INT AUTO_INCREMENT PRIMARY KEY, conversation TEXT)`);
}

function createConversationsUserRelationTable() {
    query(`CREATE TABLE userconversation (user_id INT ,conversationids TEXT)`);
}

function createMessagedsTable() {
    query(`CREATE TABLE messages (message_id INT AUTO_INCREMENT PRIMARY KEY, sender_id INT, conversation_id INT, date DATETIME , message TEXT, props TEXT)`);
}

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



function setUpTable(){
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