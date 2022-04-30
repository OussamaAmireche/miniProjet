const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into enseignant(nom, prenom, username, password, code_module)
                        values(?,?,?,?,?)`,
            [
                data.nom,
                data.prenom,
                data.username,
                data.password,
                data.code_module
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEnseignants: callBack => {
        pool.query(
            `select id, nom, prenom, intitulé from enseignant e join module m on e.code_module = m.code`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEnseignantById: (id, callBack) => {
        pool.query(
            `select id, nom, prenom, intitulé from enseignant e join module m on e.code_module = m.code where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEnseignantByUsername: (username, callBack) => {
        pool.query(
            `select * from enseignant where username = ?`,
            [username],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateEnseignant: (id, data, callBack) => {
        pool.query(
            `update enseignant set nom=?, prenom=?, username=?, password=?, code_module=? where id=?`,
            [
                data.nom,
                data.prenom,
                data.username,
                data.password,
                data.code_module,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteEnseignant: (id, callBack) => {
        pool.query(
            `delete from enseignant where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}