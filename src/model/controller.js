const dbconnection = require('./db')();

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

        const result = await this._query('SELECT * FROM users');
        console.log(result);
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
        control._query(`DELETE FROM conversations`)
        control._query(`DELETE FROM userconversation`)
        console.log('reset');
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
                        let result = await this._query(`INSERT INTO conversations (conversation) VALUES ('${serializeduserids}')`)
                        //insertId
                        for (let id of userids) {

                            const d = await this.listUserConversations(id);

                            if (d.length === 0) {
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

        let result = await this._query(`SELECT * FROM userconversation WHERE user_id = ${userid}`);
        console.log(result)
        if (result.length === 1) {
            return JSON.parse(result[0].conversationids);
        } else {
            return []
        }

    }

    // inserts a message in the main messages table
    // props can be any additions properties that may need to be adde in the future
    insertMessage = async ({ message, sender, conversationID, props = {} }) => {
        if (message && sender && conversationID) {

            const sender_id = (await this._query(`SELECT * FROM users WHERE NAME='${sender}'`))[0].NAME_ID;

            const createdDate = new Date();
            const extraProps = JSON.stringify(props);

            await this._query(`INSERT INTO messages (sender_id,conversation_id,date,message,props) VALUES (${sender_id},${conversationID},'${createdDate.toMysqlFormat()}','${message}','${extraProps}')`);

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

module.exports = control;
