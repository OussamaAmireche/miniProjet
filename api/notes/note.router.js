const {
    createNote,
    getNotes,
    getNotesById,
    getNotesByCode,
    getNotesByIdCode,
    updateNote,
    deleteNote
} = require('./note.controller');
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

router.post("/module/:code", checkToken, preventEtudiant, preventResponsable, AuthEnseignantAccess, createNote);
router.get("/", checkToken, preventEtudiant, preventEnseignant, getNotes);
router.get("/:id", checkToken, preventEnseignant, AuthEtudiantAccess, getNotesById);
router.get("/module/:code", checkToken, preventEtudiant, AuthEnseignantAccess, getNotesByCode);
router.get("/:id/:code", checkToken, decideMiddleware, getNotesByIdCode);
router.patch("/:id/:code", checkToken, preventEtudiant, preventResponsable, AuthEnseignantAccess, updateNote);
router.delete("/:id/:code", checkToken, preventEtudiant, preventResponsable, AuthEnseignantAccess, deleteNote);
module.exports = router;