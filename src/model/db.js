require('dotenv').config();
// const mysql = require('mysql')
const mysql2 = require('mysql2');


/* const con = mysql.createConnection({
    host: process.env.HOST || "localhost",
    port: 25060,
    ssl: true,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}); */

const con2 = mysql2.createConnection({
    host: process.env.HOST || "localhost",
    port: 3306,
    /* ssl: true, */
    user: 'root',
    password: 'root',
    database: 'cogniwon_dev',
});

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
async function addUser(mobile, email, first_name, last_name) {
    const sql = `INSERT INTO User_SSC (mobile,email,first_name,last_name) VALUES (${mysql.escape(mobile)},${mysql.escape(email)},${mysql.escape(first_name)},${mysql.escape(last_name)})`;
    await query(sql);
}

function query(sql) {
    return new Promise((resolve, reject) => {

        con.query(sql, function(err, result) {
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
    console.log(process.env['USER_NAME']);
    /* con.connect((err) => {

        if (err) throw err;
        console.log("db connection established");

    }); */

    con2.connect((err) => {

        if (err) throw err;
        console.log("2nd db connection established");

    });


    return { con2 };
}

function localUserDb() {
    query(`CREATE TABLE User_SSC (id INT AUTO_INCREMENT PRIMARY KEY, mobile VARCHAR(15), email VARCHAR(100), first_name VARCHAR(100), last_name VARCHAR(100) )`);
}

async function Users() {
    await query(`TRUNCATE TABLE User_SSC`)

    addUser(1234523490, 'raj1@test.com', 'raj1', 'sharma6');
    addUser(1234567890, 'raj2@test.com', 'raj2', 'sharma5');
    addUser(6723563245, 'raj3@test.com', 'raj3', 'sharma4');
    addUser(8162492372, 'raj4@test.com', 'raj4', 'sharma3');
    addUser(5647299283, 'raj5@test.com', 'raj5', 'sharma2');
    addUser(1936375238, 'raj6@test.com', 'raj6', 'sharma1');
}