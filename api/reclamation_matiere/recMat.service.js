const pool = require('../../config/database');

module.exports = {
    create: (id, data, callBack) => {
        pool.query(
            `insert into reclamation_module(id_etudiant, code_module, reclamation)
                        values(?,?,?)`,
            [
                id,
                data.code_module,
                data.reclamation
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getReclamationsById: (id, callBack) => {
        pool.query(
            `select R.id_etudiant, E.nom, E.prenom, M.intitulé, R.reclamation from etudiant E inner join reclamation_module R on E.id = R.id_etudiant inner join module M on R.code_module = M.code where R.id_etudiant = ? order by M.intitulé asc`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getReclamationsByCode: (code, callBack) => {
        pool.query(
            `select R.id_etudiant, E.nom, E.prenom, M.intitulé, R.reclamation from etudiant E inner join reclamation_module R on E.id = R.id_etudiant inner join module M on R.code_module = M.code where R.code_module = ?`,
            [code],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getReclamationsByIdCode: (id, code, callBack) => {
        pool.query(
            `select R.id_etudiant, E.nom, E.prenom, M.intitulé, R.reclamation from etudiant E inner join reclamation_module R on E.id = R.id_etudiant inner join module M on R.code_module = M.code where R.code_module = ? and R.id_etudiant = ?`,
            [
                code,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateReclamation: (code, id, data, callBack) => {
        pool.query(
            `update reclamation_module set reclamation=? where id_etudiant=? and code_module=?`,
            [
                data.reclamation,
                id,
                code
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteReclamation: (code, id, callBack) => {
        pool.query(
            `delete from reclamation_module where id_etudiant = ? and code_module = ?`,
            [
                id,
                code
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}