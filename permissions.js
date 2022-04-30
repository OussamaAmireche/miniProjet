const etudiantCanView = (etudiant, id) => etudiant.id === id;
const enseignantCanView = (enseignant, code) => enseignant.code_module === code;

module.exports = {
    etudiantCanView,
    enseignantCanView
}