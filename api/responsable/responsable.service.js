const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into responsable(nom, prenom, username, password)
                        values(?,?,?,?)`,
            [
                data.nom,
                data.prenom,
                data.username,
                data.password
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getResponsableByUsername: (username, callBack) => {
        pool.query(
            `select * from responsable where username = ?`,
            [username],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateResponsable: (username, data, callBack) => {
        pool.query(
            `update responsable set nom=?, prenom=?, username=?, password=? where username=?`,
            [
                data.nom,
                data.prenom,
                data.username,
                data.password,
                username
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteResponsable: (username, callBack) => {
        pool.query(
            `delete from responsable where username = ?`,
            [username],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}