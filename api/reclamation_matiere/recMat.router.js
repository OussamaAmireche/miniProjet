const {
    createReclamation,
    getReclamationsByCode,
    getReclamationsById,
    getReclamationsByIdCode,
    updateReclamation,
    deleteReclamation
} = require('./recMat.controller');
const router = require("express").Router();
const {
    checkToken,
    preventEtudiant,
    preventEnseignant,
    preventResponsable,
    AuthEtudiantAccess,
    AuthEnseignantAccess,
    decideMiddleware
} = require('../../auth/tokenValidation');

router.post("/:id", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, createReclamation);
router.get("/:id", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, getReclamationsById);
router.get("/module/:code", checkToken, preventEtudiant, preventResponsable, AuthEnseignantAccess, getReclamationsByCode);
router.get("/:id/:code", checkToken, preventResponsable, decideMiddleware, getReclamationsByIdCode);
router.patch("/:id/:code", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, updateReclamation);
router.delete("/:id/:code", checkToken, preventEnseignant, preventResponsable, AuthEtudiantAccess, deleteReclamation);
module.exports = router;