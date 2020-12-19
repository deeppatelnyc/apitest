const pool = require("../../config/database");
let datetime = new Date();


module.exports = {
    
    create: (data, callBack) => {
        pool.query(
            `insert into register(first_name, last_name, email, phone, password,created_at) values (?,?,?,?,?,NOW())`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.password,
                datetime,
            ],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                console.log(datetime);
                return callBack(null,results);
            }
        );
    },

    checkEmail: (email,callBack) => {
        pool.query(
            `select email from register where email = ?`,
            [
                email
            ],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }
};