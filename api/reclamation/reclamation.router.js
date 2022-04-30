const {
    createReclamation,
    getReclamations,
    getReclamationById,
    updateReclamation,
    deleteReclamation
} = require('./reclamation.controller');
const router = require("express").Router();
const {
    checkToken,
    preventEtudiant,
    preventEnseignant,
    preventResponsable,
    AuthEtudiantAccess,
} = require('../../auth/tokenValidation');

router.post("/:id", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, createReclamation);
router.get("/", checkToken, preventEnseignant, preventEtudiant, getReclamations);
router.get("/:id", checkToken, preventEnseignant, AuthEtudiantAccess, getReclamationById);
router.patch("/:id", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, updateReclamation);
router.delete("/:id", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, deleteReclamation);
module.exports = router;