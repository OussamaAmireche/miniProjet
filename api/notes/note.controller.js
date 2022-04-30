const {
    create,
    getNotes,
    getNotesById,
    getNotesByCode,
    getNotesByIdCode,
    updateNote,
    deleteNote
} = require('./note.service');

module.exports = {
    createNote: (req, res) => {
        const body = req.body;
        const code = req.params.code;
        if(typeof body.id_etudiant !== "number" || typeof body.note !== "number"){
            return res.status(422).json({
                success: 0,
                message: "données invalides"
            });
        }
        create(code, body, (err, results) => {
            if(err){
                if(err.errno === 1062){
                    return res.status(422).json({
                        success: 0,
                        message: "Vous avez déja entré une note pour cet étudiant"
                    });
                }else if(err.errno === 1452){
                    return res.status(422).json({
                        success: 0,
                        message: "L'etudiant ou le module n'existe pas"
                    });
                }else if(err.errno === 4025){
                    return res.status(422).json({
                        success: 0,
                        message: "La note doit être entre 0 et 20"
                    });
                }else{
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getNotes: (req, res) => {
        getNotes((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "Il n y a aucune note pour le moment"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getNotesById: (req, res) => {
        const id = req.params.id;
        getNotesById(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "Aucune note trouvée"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getNotesByCode: (req, res) => {
        const code = req.params.code;
        getNotesByCode(code, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "Vous n'avez inséré aucune note"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getNotesByIdCode: (req, res) => {
        const code = req.params.code;
        const id = req.params.id;
        getNotesByIdCode(id, code, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "module ou étudiant introuvable"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateNote: (req, res) => {
        const id = req.params.id;
        const code = req.params.code;
        const body = req.body;
        if(typeof body.note !== "number"){
            return res.status(422).json({
                success: 0,
                message: "données invalides"
            });
        }
        getNotesByIdCode(id, code, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "etudiant ou module introuvable"
                });
            }
            updateNote(code, id, body, (err, results) => {
                if(err){
                    if(err.errno === 1062){
                        return res.status(422).json({
                            success: 0,
                            message: "Cet étudiant possède déja une note"
                        });
                    }else{
                        return res.status(500).json({
                            success: 0,
                            message: "la modification de la note a échoué"
                        });
                    }
                }
                return res.json({
                    success: 1,
                    message: "note modifié avec succés"
                });
            });
        });
    },
    deleteNote: (req, res) => {
        const id = req.params.id;
        const code = req.params.code;
        getNotesByIdCode(id, code, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "Vous n'avez pas encore ajouté une note pour cet étudiant"
                });
            }
            deleteNote(code, id, (err, results) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "suppression de la note a échoué"
                    });
                }
                return res.json({
                    success: 1,
                    message: "note supprimé avec succés"
                });
            });
        });
    }
}