require('dotenv').config();
const express = require('express');
const app = express();
const etudiantRouter = require("./api/etudiants/etudiant.router");
const reclamationRouter = require("./api/reclamation/reclamation.router");
const noteRouter = require("./api/notes/note.router");
const recMatRouter = require('./api/reclamation_matiere/recMat.router');
const responsableRouter = require('./api/responsable/responsable.router');
const enseignantRouter = require('./api/enseignant/enseignant.router');

app.use(express.json());

app.use("/api/etudiant", etudiantRouter);
app.use("/api/reclamation", reclamationRouter);
app.use("/api/note", noteRouter);
app.use("/api/reclamation_matiere", recMatRouter);
app.use("/api/responsable", responsableRouter);
app.use("/api/enseignant", enseignantRouter);
app.listen(process.env.APP_PORT, () => {
    console.log('Server listening on port :', process.env.APP_PORT);
});