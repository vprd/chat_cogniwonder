const dbconnection = require('./db')();

class Controller {

    constructor() {
        this.dbconnection = dbconnection;
    }


    _testing = async () => {

        const result = await this._query('UPDATE conversations SET PWD = "test" WHERE PWD IS NULL');
        console.log(result);

        return result
    }
    _listUsers = async () => {

        const result = await this._query('SELECT * FROM users');
        console.log(result);
        return result
    }

    _query = (sql) => {
        const con = this.dbconnection;
        return new Promise((resolve, reject) => {

            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    createConversation = async (userids) => {
        if (Array.isArray(userids)) {

            const existing = await this.listConversations(userids)

            if (existing.length === 0) {
                if (Array.isArray(userids)) {
                    try {

                        const serializeduserids = JSON.stringify(userids);
                        let result = await this._query(`INSERT INTO conversations (conversation) VALUES ('${serializeduserids}')`)
                        //insertId
                        userids.map(id => {
                            this.listUserConversations(id)
                                .then(d => {
                                    if (d.length < 1) {
                                        this._query(`INSERT INTO userconversation (user_id,conversationids) VALUES (${id},'${JSON.stringify([result.insertId])}')`);
                                    } else {
                                        this._query(`
                                            UPDATE userconversation
                                            SET conversationids='${JSON.stringify(d.push(result.insertId))}'
                                            WHERE user_id=${id};
                                        `);
                                    }
                                })
                        })

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

    deleteConversation = async () => {
        control._query(`DELETE FROM conversations WHERE conversation='[1,2]'`)
        control._query(`DELETE FROM userconversation`)
    }

    listUserConversations = async (userid) => {
        let result = await this._query(`SELECT * FROM userconversation WHERE user_id = ${userid}`);
        console.log(result)
        if (result.length === 1) {
            return JSON.parse(result[0].conversationids);
        } else {

            return []
        }

    }

}

const control = new Controller();

(async () => {

    //console.log(await control.createConversation([1, 2]));
    //console.log(await control.listConversations());
    //console.log(await control.listUserConversations(2));

    //control._query(`CREATE TABLE userconversation (user_id INT ,conversationids TEXT)`);
    //console.log(await control._query(`SELECT * FROM userconversation`));
    //console.log(await control._query(`INSERT INTO userconversation (user_id,conversationids) VALUES (1,'[17]')`));
})();