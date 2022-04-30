const pool = require('../../config/database');

module.exports = {
    create: (code, data, callBack) => {
        pool.query(
            `insert into note(id_etudiant, code_module, note)
                        values(?,?,?)`,
            [
                data.id_etudiant,
                code,
                data.note
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getNotes: callBack => {
        pool.query(
            `select N.id_etudiant, E.nom, E.prenom, M.intitulé, N.note from etudiant E inner join note N on E.id = N.id_etudiant inner join module M on N.code_module = M.code order by M.intitulé asc, N.note desc`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getNotesById: (id, callBack) => {
        pool.query(
            `select N.id_etudiant, E.nom, E.prenom, M.intitulé, N.note from etudiant E inner join note N on E.id = N.id_etudiant inner join module M on N.code_module = M.code where N.id_etudiant = ? order by M.intitulé asc`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getNotesByCode: (code, callBack) => {
        pool.query(
            `select N.id_etudiant, E.nom, E.prenom, M.intitulé, N.note from etudiant E inner join note N on E.id = N.id_etudiant inner join module M on N.code_module = M.code where N.code_module = ? order by N.note desc`,
            [code],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getNotesByIdCode: (id, code, callBack) => {
        pool.query(
            `select N.id_etudiant, E.nom, E.prenom, M.intitulé, N.note from etudiant E inner join note N on E.id = N.id_etudiant inner join module M on N.code_module = M.code where N.code_module = ? and N.id_etudiant = ?`,
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
    updateNote: (code, id, data, callBack) => {
        pool.query(
            `update note set note=? where id_etudiant=? and code_module=?`,
            [
                data.note,
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
    deleteNote: (code, id, callBack) => {
        pool.query(
            `delete from note where id_etudiant = ? and code_module = ?`,
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