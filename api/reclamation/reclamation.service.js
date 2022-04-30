const pool = require('../../config/database');

module.exports = {
    create: (id, data, callBack) => {
        pool.query(
            `insert into reclamation(id_etudiant, reclamation)
                        values(?,?)`,
            [
                id,
                data.reclamation,
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getReclamations: callBack => {
        pool.query(
            `select R.id_etudiant, E.nom, E.prenom, R.reclamation from etudiant E inner join reclamation R on E.id = R.id_etudiant`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getReclamationById: (id, callBack) => {
        pool.query(
            `select R.id_etudiant, E.nom, E.prenom, R.reclamation from etudiant E inner join reclamation R on E.id = R.id_etudiant where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateReclamation: (id, data, callBack) => {
        pool.query(
            `update reclamation set reclamation=? where id_etudiant=?`,
            [
                data.reclamation,
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
    deleteReclamation: (id, callBack) => {
        pool.query(
            `delete from reclamation where id_etudiant = ?`,
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