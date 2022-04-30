const {
    createResponsable,
    getResponsableByUsername,
    updateResponsable,
    deleteResponsable,
    loginResponsable
} = require('./responsable.controller');
const router = require("express").Router();
const {
    checkToken,
    preventEtudiant,
    preventEnseignant
} = require('../../auth/tokenValidation');

router.post("/", checkToken, preventEnseignant, preventEtudiant, createResponsable);
router.get("/:username", checkToken, preventEnseignant, preventEtudiant, getResponsableByUsername);
router.patch("/:username", checkToken, preventEnseignant, preventEtudiant, updateResponsable);
router.delete("/:username", checkToken, preventEnseignant, preventEtudiant, deleteResponsable);
router.post('/login', loginResponsable);
module.exports = router;