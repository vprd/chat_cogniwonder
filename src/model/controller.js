const dbconnection = require('./db')();

class Controller {

    constructor() {
        this.dbconnection = dbconnection;
    }


    _testing = async () => {

        const result = await this._query('UPDATE users SET PWD = "test" WHERE PWD IS NULL');
        console.log(result);
    }
    _listUsers=async()=>{
        const result = await this._query('SELECT * FROM users');
        console.log(result);
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

}

const control = new Controller();

control._listUsers();