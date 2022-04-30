const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into etudiant(nom, prenom, username, password)
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
    getEtudiants: callBack => {
        pool.query(
            `select id, nom, prenom from etudiant`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEtudiantById: (id, callBack) => {
        pool.query(
            `select id, nom, prenom from etudiant where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEtudiantByUsername: (username, callBack) => {
        pool.query(
            `select * from etudiant where username = ?`,
            [username],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateEtudiant: (id, data, callBack) => {
        pool.query(
            `update etudiant set nom=?, prenom=?, username=?, password=? where id=?`,
            [
                data.nom,
                data.prenom,
                data.username,
                data.password,
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
    deleteEtudiant: (id, callBack) => {
        pool.query(
            `delete from etudiant where id = ?`,
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