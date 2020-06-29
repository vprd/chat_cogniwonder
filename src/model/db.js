const mysql = require('mysql');// mysql(would have still prefered mongodb)


const con = mysql.createConnection({
    host: "localhost",
    user: 'atozbfw7_test',
    password: 'test@112233445566',
    database: 'atozbfw7_test',

});
//3490442_chatdb
//u9FA5jp2kE@!zG/
//3490442_chatdb'@'185.176.40.25
// TABLE NAME = conversations
// Table to store all conversations, conversation is a serialized array of all the conversations on the entire platform
function createConversationsTable() {
    query(`CREATE TABLE conversations (conversation_id INT AUTO_INCREMENT PRIMARY KEY, conversation TEXT, conversation_name TEXT, props TEXT)`);
}

// TABLE NAME = userconversation
// This table stores the conversations each user is a participant of
function createConversationsUserRelationTable() {
    query(`CREATE TABLE userconversation (user_id INT ,conversationids TEXT)`);
}

// TABLE NAME = messages
// Contains every message sent on the platform with all its properties
function createMessagedsTable() {
    query(`CREATE TABLE messages (message_id INT AUTO_INCREMENT PRIMARY KEY, sender TEXT, conversation_id INT, date DATETIME , message TEXT, props TEXT)`);
    
    //does not support emojies by default
    //query(`ALTER TABLE messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin`)
}

// this is just to make test usesrs
async function addUser(username,pwd) {
    const sql = `INSERT INTO users (NAME,PWD) VALUES ('${username}','${pwd}')`;
    await query(sql);
}

function query(sql) {
    return new Promise((resolve, reject) => {

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
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

async function Users(){
    await query(`TRUNCATE TABLE users`)
    await query(`TRUNCATE TABLE users`)

    addUser('raj','test');
    addUser('admin','test');
    addUser('Yash','test');
    addUser('Jeet','test');
    addUser('John','test');
    addUser('Surya','test');
}