
const { con2 } = require('./db')()
const dbconnection = con2;
// const dbconnection = con;
const SqlString = require('sqlstring');

const control = {

    dbconnection,
    _listUsers: async function () {

        const result = await this._query('SELECT * FROM User_SSC');
        console.log(result)
        return result
    },

    // Async wrapper for sql queries
    _query: function (sql, version) {
        if (!version) {
            const con = this.dbconnection;
            return new Promise((resolve, reject) => {

                con.query(sql, function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } /* else {
            const con = this.dbconnection2;
            return new Promise((resolve, reject) => {

                con.query(sql, function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } */
    },

    // Reset the testing DB tables 
    _delete: async function () {

        control._query(`TRUNCATE TABLE conversations`);
        control._query(`TRUNCATE TABLE userconversation`);
        control._query(`TRUNCATE TABLE messages`);

        console.log('reset');
    },
    _resettotestsdata: async function () {

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
    },
    authorize: async function ({ mdn, cwcc }) {
        if (mdn && cwcc) {
            try {
                const user = (await this._query(`SELECT * FROM User_SSC WHERE mobile='${mdn}'`))[0];
                if (user.chat_token === cwcc) return user;
                return false;

            } catch (error) {
                console.log('something went wrong in authorize function');
                console.log(error);
            }
        } else {
            console.warn('mdn or cwcc was missing', mdn, cwcc)
            return false
        }
    },
    authenticate: async function ({ email, mobile }) {
        /*  if ((typeof username === 'string') && (typeof password === 'string')) {
             const result = (await this._query(`SELECT * FROM users WHERE NAME='${username}'`))[0];
             if (password === result.PWD) return result.NAME_ID;
         }
         return false; */
        if (email) {
            const user = (await this._query(`SELECT * FROM User_SSC WHERE email='${email}'`))[0];
            if (user) return {
                mobile: user.mobile,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                id: user.id
            }
        } else if (mobile) {
            const user = (await this._query(`SELECT * FROM User_SSC WHERE mobile='${mobile}'`))[0];
            if (user) return {
                mobile: user.mobile,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                id: user.id
            }
        }

        return false


    },

    searchUsers: async function ({ user }) {

        if (user) {
            let result
            if (Number(user)) {

                result = await this._query(`SELECT * FROM User_SSC WHERE mobile LIKE '${user}%'`)

            } else {

                result = await this._query(`SELECT * FROM User_SSC WHERE email LIKE '${user}%'`)

            }

            return result.map(user => {
                return {
                    mobile: user.mobile,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id: user.id
                }
            });

        }
        return false;

    },



    // Creates a conversation in the conversation table if it does not already exists
    // also creates the relation needed in the useruserconversation if not already there
    createConversation: async function (userids, creator) {
        if (Array.isArray(userids)) {
            userids = userids.sort();
            const existing = await this.listConversations(userids)

            if (existing.length === 0) {
                if (Array.isArray(userids)) {
                    try {

                        const serializeduserids = JSON.stringify(userids);
                        const conversation_name = JSON.stringify(await this.getUsernames(userids));
                        let result = await this._query(`INSERT INTO conversations (conversation,conversation_name,creator) VALUES ('${serializeduserids}','${conversation_name}','${creator}')`);
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


    },
    getUsernames: async function (userids) {
        if (Array.isArray(userids)) {
            const users = await Promise.all(userids.map(id => {
                return this._query(`SELECT * FROM User_SSC WHERE id=${id}`);
            }));

            return users.map(user => user[0].first_name);
        }
    },
    // returns all the conversations in TABLE=conversations
    // or can return the conversation with the specified userids
    listConversations: async function (userids) {

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


    },

    // similar to listConversations but returns all
    // the conversation ids of a specified user id has made
    listUserConversations: async function (userid) {

        if (userid) {

            let result = await this._query(`SELECT * FROM userconversation WHERE user_id = ${userid}`);

            if (result.length === 1) {
                return JSON.parse(result[0].conversationids);
            } else {
                return []
            }
        } else {
            let result = await this._query(`SELECT * FROM userconversation`);

            return []
        }

    },
    getConversations: async function (userid) {

        const convoids = await this.listUserConversations(userid);

        const conversations = (await Promise.all(convoids.map(id => {
            return this._query(`SELECT * FROM conversations WHERE conversation_id=${id} ORDER BY recent_activity asc`);
        }))).map(c => {
            const cname = JSON.parse(c[0].conversation_name)
            if (Array.isArray(cname)) {
                c[0].conversation_name = JSON.parse(c[0].conversation_name);
            } else if (cname.display_name && cname.users) {
                c[0].conversation_name = cname.users;
                c[0].display_name = cname.display_name;
            }
            c[0].conversation = JSON.parse(c[0].conversation);
            return c[0];
        });

        return conversations;
    },

    setConversationName: async function ({ conversation_id, conversation_name }) {
        const result = (await this._query(`SELECT * FROM conversations WHERE conversation_id=${conversation_id}`))[0];
        const cname = JSON.parse(result.conversation_name)
        let newcname = {}
        if (Array.isArray(cname)) {
            newcname.display_name = conversation_id
            newcname.users = cname
        } else {
            newcname = { ...cname, display_name: conversation_name }
        }
        return await this._query(`UPDATE conversations SET conversation_name='${JSON.stringify(newcname)}' WHERE conversation_id=${conversation_id}`);
    },
    updateConversationActivity: async function (conversation_id, date) {
        const createdDate = new Date(date) || new Date();
        return await this._query(`UPDATE conversations SET recent_activity = '${createdDate.toMysqlFormat()}' WHERE conversation_id=${conversation_id}`);
    },

    // inserts a message in the main messages table
    // props can be any additions properties that may need to be adde in the future
    insertMessage: async function ({ sender_id, message, sender, conversation_id, date, props = {} }) {
        console.log(message)
        if (message && sender && conversation_id) {
            const createdDate = new Date(date) || new Date();
            const extraProps = JSON.stringify(props);

            message = SqlString.escape(message);

            await this._query(`INSERT INTO messages (sender,sender_id,conversation_id,date,message,props) VALUES ('${sender}',${sender_id},${conversation_id},'${createdDate.toMysqlFormat()}',${message},'${extraProps}')`);

            return {
                message, sender_id, sender, conversation_id, date: createdDate, props
            }
        }
        else {
            throw new Error(`message, sender and reciever must be defined`);
        }
    },

    // returns all the messages in a conversation specified by a conversationID
    getMessages: async function (conversationID, page = 0, page_size = 20) {
        const count = await this._query(`SELECT COUNT(conversation_id) FROM messages WHERE conversation_id=${conversationID}`);
        const total = count[0]['COUNT(conversation_id)']
        if (total > page_size) {

            const result = await this._query(`SELECT * FROM messages WHERE conversation_id=${conversationID} ORDER BY date desc LIMIT ${0},${(page * page_size) + page_size}`);
            if (result.length < total) page += 1;
            return { count: total, page, messages: result.reverse() };
        } else {
            const result = await this._query(`SELECT * FROM messages WHERE conversation_id=${conversationID} ORDER BY date desc`);
            return { count: total, page: 0, messages: result.reverse() };
        }
    },
    getUserIDs: async function () {

        const result = await this._query(`SELECT * FROM User_SSC`)

        return result.map(user => user.id);

    },
    sequentialget: async function () {
        const one = await this._query(`SELECT * FROM User_SSC`);
        const two = await this._query(`SELECT * FROM messages`);
        const three = await this._query(`SELECT * FROM conversations`);
        const four = await this._query(`SELECT * FROM userconversation`);
        return [one, two, three, four].flat()
    },
    parallelget: async function () {
        const one = this._query(`SELECT * FROM User_SSC`);
        const two = this._query(`SELECT * FROM messages`);
        const three = this._query(`SELECT * FROM conversations`);
        const four = this._query(`SELECT * FROM userconversation`);

        return (await Promise.all([one, two, three, four])).flat();
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
//const control = new Controller();


(async () => {
    // control._query(`ALTER conversations`);
    // control._delete();
    //log(await control.listConversations())
    /* console.time()
    await control._query(`SELECT * FROM conversations`);
    console.timeEnd() */
    // console.log(await control._query(`ALTER TABLE conversations ADD creator INT`))
    // console.log(await control._query(`SELECT * FROM User_SSC WHERE chat_token='cw5f35a349096779.421'`))
    // control._query(`ALTER TABLE messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`)
    //control.createConversation([1,2])
})();

module.exports = control;
