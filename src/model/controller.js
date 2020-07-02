const dbconnection = require('./db')();
const SqlString = require('sqlstring');
class Controller {

    constructor() {
        this.dbconnection = dbconnection;
    }

    /* _testing = async () => {

        const result = await this._query('UPDATE conversations SET PWD = "test" WHERE PWD IS NULL');
        console.log(result);

        return result
    } */

    _listUsers = async () => {

        const result = await this._query('SELECT * FROM User_SSC');
        console.log(result)
        return result
    }

    // Async wrapper for sql queries
    _query = (sql) => {
        const con = this.dbconnection;
        return new Promise((resolve, reject) => {

            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Reset the testing DB tables 
    _delete = async () => {

        control._query(`TRUNCATE TABLE conversations`);
        control._query(`TRUNCATE TABLE userconversation`);
        control._query(`TRUNCATE TABLE messages`);

        console.log('reset');
    }
    _resettotestsdata = async () => {

        this._delete();

        console.log(await this.createConversation([1, 2]));
        console.log(await this.createConversation([2, 3]));
        console.log(await this.createConversation([3, 4]));
        console.log(await this.createConversation([4, 5]));
        console.log(await this.createConversation([5, 6]));
        console.log(await this.createConversation([6, 1]));
        console.log(await this.createConversation([1, 2, 3, 4, 5, 6]));
        console.log(await this.createConversation([1, 2, 3]));
        console.log(await this.createConversation([1, 3, 5]));
    }

    authenticate = async ({ email, mobile }) => {
        /*  if ((typeof username === 'string') && (typeof password === 'string')) {
             const result = (await this._query(`SELECT * FROM users WHERE NAME='${username}'`))[0];
             if (password === result.PWD) return result.NAME_ID;
         }
         return false; */
        if (email) {
            const result = (await this._query(`SELECT * FROM User_SSC WHERE email='${email}'`))[0];
            if (result) return true
        } else if (mobile) {
            const result = (await this._query(`SELECT * FROM User_SSC WHERE mobile='${mobile}'`))[0];
            if (result) return true
        }

        return false


    }

    searchUsers = async ({ user }) => {

        if (user) {
            let result
            if (Number(user)) {
                console.log(user);
                result = await this._query(`SELECT * FROM User_SSC WHERE mobile LIKE '${user}%'`)

            } else {
                console.log(user);
                result = await this._query(`SELECT * FROM User_SSC WHERE email LIKE '${user}%'`)

            }

            return result.map(user => {
                return {
                    mobile: user.mobile,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                }
            });

        }
        return false;

    }

    // Creates a conversation in the conversation table if it does not already exists
    // also creates the relation needed in the useruserconversation if not already there
    createConversation = async (userids) => {
        if (Array.isArray(userids)) {

            const existing = await this.listConversations(userids)

            if (existing.length === 0) {
                if (Array.isArray(userids)) {
                    try {

                        const serializeduserids = JSON.stringify(userids);
                        const conversation_name = JSON.stringify(await this.getUsernames(userids));
                        let result = await this._query(`INSERT INTO conversations (conversation,conversation_name) VALUES ('${serializeduserids}','${conversation_name}')`)
                        //insertId
                        for (let id of userids) {

                            const d = await this.listUserConversations(id);


                            if ((d.length === 0)) {
                                await this._query(`INSERT INTO userconversation (user_id,conversationids) VALUES (${id},'${JSON.stringify([result.insertId])}')`);
                            } else {
                                d.push(result.insertId);
                                await this._query(`UPDATE userconversation SET conversationids='${JSON.stringify(d)}' WHERE user_id=${id}`);
                            }


                        }

                        return result
                    } catch (e) {
                        throw e
                    }
                } else {
                    throw new Error('createConversation requires an array of userIDs')
                }
            }
        }


    }
    getUsernames = async (userids) => {
        if (Array.isArray(userids)) {
            const users = await Promise.all(userids.map(id => {
                return this._query(`SELECT * FROM users WHERE NAME_ID=${id}`);
            }));
            console.log(users);
            return users.map(user => user[0].NAME);
        }
    }
    // returns all the conversations in TABLE=conversations
    // or can return the conversation with the specified userids
    listConversations = async (userids) => {

        if (userids) {
            userids = JSON.stringify(userids);
            let result = await this._query(`SELECT * FROM conversations WHERE conversation = '${userids}'`);

            if (result.length > 0) result = result.map(d => {
                return {
                    ...d,
                    conversation: JSON.parse(d.conversation)
                }
            });
            return result;
        } else {
            let result = await this._query('SELECT * FROM conversations');

            if (result.length > 0) {
                result = result.map(d => {

                    return {
                        ...d,
                        conversation: JSON.parse(d.conversation)
                    }
                });
            }
            return result;
        }


    }

    // similar to listConversations but returns all
    // the conversation ids of a specified user id has made
    listUserConversations = async (userid) => {

        if (userid) {

            let result = await this._query(`SELECT * FROM userconversation WHERE user_id = ${userid}`);
            console.log(userid, result)
            if (result.length === 1) {
                return JSON.parse(result[0].conversationids);
            } else {
                return []
            }
        } else {
            let result = await this._query(`SELECT * FROM userconversation`);
            console.log('nooo', result)
            return []
        }

    }
    getConversations = async (userid) => {

        const convoids = await this.listUserConversations(userid);
        console.log(convoids);
        const conversations = (await Promise.all(convoids.map(id => {
            return this._query(`SELECT * FROM conversations WHERE conversation_id=${id}`);
        }))).map(c => {
            c[0].conversation = JSON.parse(c[0].conversation);
            c[0].conversation_name = JSON.parse(c[0].conversation_name);
            return c[0];
        });

        return conversations;
    }

    setConversationName = async (conversation_id, conversation_name) => {
        const result = await this._query(`UPDATE conversations SET conversation_name='${conversation_name}' WHERE conversation_id=${conversation_id}`);
        return result;
    }

    // inserts a message in the main messages table
    // props can be any additions properties that may need to be adde in the future
    insertMessage = async ({ sender_id, message, sender, conversation_id, date, props = {} }) => {

        if (message && sender && conversation_id) {
            const createdDate = new Date(date) || new Date();
            const extraProps = JSON.stringify(props);

            message = SqlString.escape(message);

            await this._query(`INSERT INTO messages (sender,sender_id,conversation_id,date,message,props) VALUES ('${sender}',${sender_id},${conversation_id},'${createdDate.toMysqlFormat()}',${message},'${extraProps}')`);
            console.log(sender)
            return {
                message, sender_id, sender, conversation_id, date: createdDate, props
            }
        }
        else {
            throw new Error(`message, sender and reciever must be defined`);
        }
    }

    // returns all the messages in a conversation specified by a conversationID
    getMessages = async (conversationID) => {
        const result = (await this._query(`SELECT * FROM messages WHERE conversation_id=${conversationID}`));
        return result;
    }

}



// !DO NOT REMOVE THIS
// Converts javascripts date format to mysqls weird datetime type
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

// the instance of the controller used elsewhere
const control = new Controller();

(async () => {
    //control._query(`DROP TABLE userconversation`);
    //control._delete();
    //console.log(await control.listConversations())
    //control._query(`ALTER TABLE conversations ADD props TEXT`)
    //control._query(`ALTER TABLE messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`)

})();

module.exports = control;
