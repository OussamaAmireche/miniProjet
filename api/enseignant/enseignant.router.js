const {
    createEnseignant,
    getEnseignants,
    getEnseignantById,
    loginEnseignant,
    updateEnseignant,
    deleteEnseignant
} = require('./enseignant.controller');
const router = require("express").Router();
const {
    checkToken,
    preventEtudiant,
    preventEnseignant,
} = require('../../auth/tokenValidation');

router.post("/", checkToken, preventEtudiant, preventEnseignant, createEnseignant);
router.get("/", checkToken,  getEnseignants);
router.get("/:id", checkToken, getEnseignantById);
router.patch("/:id", checkToken, preventEtudiant, preventEnseignant, updateEnseignant);
router.delete("/:id", checkToken, preventEtudiant, preventEnseignant, deleteEnseignant);
router.post('/login', loginEnseignant);
module.exports = router;