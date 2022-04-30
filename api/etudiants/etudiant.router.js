const { 
    createEtudiant,
    getEtudiants,
    getEtudiantById,
    updateEtudiant,
    deleteEtudiant,
    loginEtudiant
} = require('./etudiant.controller');
const router = require("express").Router();
const {
    checkToken,
    preventEtudiant,
    preventEnseignant,
} = require('../../auth/tokenValidation');

router.post("/", checkToken, preventEtudiant, preventEnseignant, createEtudiant);
router.get("/", checkToken, getEtudiants);
router.get("/:id", checkToken, getEtudiantById);
router.patch("/:id", checkToken, preventEtudiant, preventEnseignant, updateEtudiant);
router.delete("/:id", checkToken, preventEtudiant, preventEnseignant, deleteEtudiant);
router.post('/login', loginEtudiant);
module.exports = router;