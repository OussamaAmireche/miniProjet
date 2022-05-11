const { 
    create,
    getReclamations,
    getReclamationById,
    updateReclamation,
    deleteReclamation
} = require('./reclamation.service');

module.exports = {
    createReclamation: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        create(Number(id), body, (err, results) => {
            if(err){
                if(err.errno === 1062){
                    return res.status(422).json({
                        success: 0,
                        message: "Tu as déja fait une réclamation"
                    });
                }else if(err.errno === 1452){
                    return res.status(422).json({
                        success: 0,
                        message: "Cet étudiant n'existe pas"
                    });
                }else{
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getReclamations: (req, res) => {
        getReclamations((err, results) => {
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
                    message: "Il n y a aucune reclamation pour le moment"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getReclamationById: (req, res) => {
        const id = req.params.id;
        getReclamationById(id, (err, results) => {
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
                    message: "Aucune reclamation trouvée"
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
        const body = req.body;
        getReclamationById(id, (err, results) => {
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
                    message: "Reclamation n'esixte pas"
                });
            }
            updateReclamation(id, body, (err, results) => {
                if(err){
                    if(err.errno === 1062){
                        return res.status(422).json({
                            success: 0,
                            message: "Tu as déja fait une réclamation"
                        });
                    }else{
                        return res.status(500).json({
                            success: 0,
                            message: "la modification de la réclamation a échoué"
                        });
                    }
                }
                return res.json({
                    success: 1,
                    message: "Reclamation modifié avec succés"
                });
            });
        });
    },
    deleteReclamation: (req, res) => {
        const id = req.params.id;
        getReclamationById(id, (err, results) => {
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
                    message: "Aucune reclamation trouvée"
                });
            }
            deleteReclamation(id, (err, results) => {
                if(err){
                    return res.status(500).json({
                        success: 0,
                        message: "suppression de la reclamation a échoué"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Reclamation supprimé avec succés"
                });
            });
        });
    }
}