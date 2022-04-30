const {
    create,
    getEnseignants,
    getEnseignantById,
    getEnseignantByUsername,
    updateEnseignant,
    deleteEnseignant
} = require('./enseignant.service');
const { validateNames } = require('../../validator');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createEnseignant: (req, res) => {
        const body = req.body;
        let validNom = validateNames(body.nom.toString());
        let validPrenom = validateNames(body.prenom.toString());
        if(body.nom.toString().trim().length < 3 
            || body.prenom.toString().trim().length < 3 
            || body.username.toString().trim().length < 3 
            || body.password.toString().length < 5 
            || !validNom 
            || !validPrenom){
            return res.status(422).json({
                success: 0,
                message: "données invalides"
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                if(err.errno === 1062){
                    return res.status(422).json({
                        success: 0,
                        message: "Nom d'utilisateur existe déja"
                    });
                }else if(err.errno === 1452){
                    return res.status(422).json({
                        success: 0,
                        message: "ce module n'existe pas"
                    });
                }else{
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
    getEnseignantById: (req, res) => {
        const id = req.params.id;
        getEnseignantById(id, (err, results) => {
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
                    message: "Aucun enseignant trouvé"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getEnseignants: (req,res) => {
        getEnseignants((err,results) => {
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
                    message: "il n y a aucun enseignant pour le moment"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateEnseignant: (req,res) => {
        const id = req.params.id;
        const body = req.body;
        let validNom = validateNames(body.nom.toString());
        let validPrenom = validateNames(body.prenom.toString());
        if(body.nom.toString().trim().length < 3 
            || body.prenom.toString().trim().length < 3 
            || body.username.toString().trim().length < 3 
            || body.password.toString().length < 5 
            || !validNom 
            || !validPrenom){
            return res.status(422).json({
                success: 0,
                message: "données invalides"
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        getEnseignantById(id, (err, results) => {
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
                    message: "Enseignant n'existe pas"
                });
            }
            updateEnseignant(id, body, (err, results) => {
                if(err){
                    if(err.errno === 1062){
                        return res.status(422).json({
                            success: 0,
                            message: "Nom d'utilisateur existe déja"
                        });
                    }else{
                        return res.status(500).json({
                            success: 0,
                            message: "la modification de l'enseignant à échoué"
                        });
                    }
                }
                return res.json({
                    success: 1,
                    message: "modifié avec succés"
                });
            });
        });
    },
    deleteEnseignant: (req, res) => {
        const id = req.params.id;
        getEnseignantById(id, (err, results) => {
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
                    message: "Enseignant n'existe pas"
                });
            }
            deleteEnseignant(id, (err, results) => {
                if(err){
                    return res.status(500).json({
                        success: 0,
                        message: "suppression de l'enseignant a échoué"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Enseignant supprimé avec succés"
                });
            });
        });
    },
    loginEnseignant: (req, res) => {
        const body = req.body;
        getEnseignantByUsername(body.username, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(401).json({
                    success: 0,
                    data: "nom d'utilisateur ou mot de passe invalide"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.ENCRYPT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "connexion avec succés",
                    token: jsontoken
                  });
            } else {
                return res.status(401).json({
                    success: 0,
                    data: "nom d'utilisateur ou mot de passe invalide"
                });
            }
        });
    }
}