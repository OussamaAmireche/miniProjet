const {
    create,
    getResponsableByUsername,
    updateResponsable,
    deleteResponsable
} = require('./responsable.service');
const { validateNames } = require('../../validator');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createResponsable: (req, res) => {
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
    getResponsableByUsername: (req, res) => {
        const username = req.params.username;
        getResponsableByUsername(username, (err, results) => {
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
                    message: "Aucun responsable trouvé"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateResponsable: (req,res) => {
        const username = req.params.username;
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
        getResponsableByUsername(username, (err, results) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Responsable n'existe pas"
                });
            }
            updateResponsable(username, body, (err, results) => {
                if(err){
                    if(err.errno === 1062){
                        return res.status(422).json({
                            success: 0,
                            message: "Nom d'utilisateur existe déja"
                        });
                    }else{
                        return res.status(500).json({
                            success: 0,
                            message: "la modification du responsable à échoué"
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
    deleteResponsable: (req, res) => {
        const username = req.params.username;
        getResponsableByUsername(username, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Server Error"
                });
            }
            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Responsable n'existe pas"
                });
            }
            deleteResponsable(username, (err, results) => {
                if(err){
                    return res.status(500).json({
                        success: 0,
                        message: "suppression du responsable a échoué"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Responsable supprimé avec succés"
                });
            });
        });
    },
    loginResponsable: (req, res) => {
        const body = req.body;
        getResponsableByUsername(body.username, (err, results) => {
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