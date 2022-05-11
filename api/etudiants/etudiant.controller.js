const { 
    create,
    getEtudiants,
    getEtudiantByUsername,
    getEtudiantById,
    updateEtudiant,
    deleteEtudiant
 } = require('./etudiant.service');
 const { validateNames } = require('../../validator');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createEtudiant: (req, res) => {
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
    getEtudiantById: (req, res) => {
        const id = req.params.id;
        getEtudiantById(id, (err, results) => {
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
                    message: "Aucun étudiant trouvé"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getEtudiants: (req,res) => {
        getEtudiants((err,results) => {
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
                    message: "il n y a aucun étudiant pour le moment"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateEtudiant: (req,res) => {
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
        getEtudiantById(id, (err, results) => {
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
                    message: "Etudiant n'existe pas"
                });
            }
            updateEtudiant(id, body, (err, results) => {
                if(err){
                    if(err.errno === 1062){
                        return res.status(422).json({
                            success: 0,
                            message: "Nom d'utilisateur existe déja"
                        });
                    }else{
                        return res.status(500).json({
                            success: 0,
                            message: "la modification de l'etudiant à échoué"
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
    deleteEtudiant: (req, res) => {
        const id = req.params.id;
        getEtudiantById(id, (err, results) => {
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
                    message: "Etudiant n'existe pas"
                });
            }
            deleteEtudiant(id, (err, results) => {
                if(err){
                    return res.status(500).json({
                        success: 0,
                        message: "suppression de l'etudiant a échoué"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Etudiant supprimé avec succés"
                });
            });
        });
    },
    loginEtudiant: (req, res) => {
        const body = req.body;
        getEtudiantByUsername(body.username, (err, results) => {
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