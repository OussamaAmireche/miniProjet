const {
    create,
    getReclamationsById,
    getReclamationsByCode,
    getReclamationsByIdCode,
    updateReclamation,
    deleteReclamation
} = require('./recMat.service');

module.exports = {
    createReclamation: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        create(Number(id), body, (err, results) => {
            if(err){
                if(err.errno === 1062){
                    return res.status(422).json({
                        success: 0,
                        message: "Vous avez déja fait une reclamation dans ce module"
                    });
                }else if(err.errno === 1452){
                    return res.status(422).json({
                        success: 0,
                        message: "L'etudiant ou le module n'existe pas"
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
    getReclamationsById: (req, res) => {
        const id = req.params.id;
        getReclamationsById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "Aucune reclamation trouvée"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getReclamationsByCode: (req, res) => {
        const code = req.params.code;
        getReclamationsByCode(code, (err, results) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(results.length === 0){
                return res.status(404).json({
                    success: 0,
                    message: "Aucune reclamation trouvée"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getReclamationsByIdCode: (req, res) => {
        const code = req.params.code;
        const id = req.params.id;
        getReclamationsByIdCode(id, code, (err, results) => {
            if(err){
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
    updateReclamation: (req, res) => {
        const id = req.params.id;
        const code = req.params.code;
        const body = req.body;
        getReclamationsByIdCode(id, code, (err, results) => {
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
            updateReclamation(code, id, body, (err, results) => {
                if(err){
                    if(err.errno === 1062){
                        return res.status(422).json({
                            success: 0,
                            message: "Vous avez déja fait une reclamation"
                        });
                    }else{
                        return res.status(500).json({
                            success: 0,
                            message: "la modification de la reclamation a échoué"
                        });
                    }
                }
                return res.json({
                    success: 1,
                    message: "reclamation modifié avec succés"
                });
            });
        });
    },
    deleteReclamation: (req, res) => {
        const id = req.params.id;
        const code = req.params.code;
        getReclamationsByIdCode(id, code, (err, results) => {
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
                    message: "Vous n'avez pas encore fait une reclamation"
                });
            }
            deleteReclamation(code, id, (err, results) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "suppression de la reclamation a échoué"
                    });
                }
                return res.json({
                    success: 1,
                    message: "reclamation supprimé avec succés"
                });
            });
        });
    }
}