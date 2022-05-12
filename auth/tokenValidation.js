const jwt = require("jsonwebtoken");
const { etudiantCanView, enseignantCanView } = require('../permissions');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        jwt.verify(token, process.env.ENCRYPT_KEY, (err, decoded) => {
            if (err) {
            return res.status(401).json({
                success: 0,
                message: "Invalid Token..."
            });
            } else {
            req.decoded = decoded;
            next();
            }
        });
        } else {
        return res.status(401).json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
        }
    },
    preventEtudiant: (req, res, next) => {
        if(req.decoded.result.role === "etudiant"){
            return res.status(403).json({
                success: 0,
                message: "You cannot access this page!"
            });
        }
        next();
    },
    preventEnseignant: (req, res, next) => {
        if(req.decoded.result.role === "enseignant"){
            return res.status(403).json({
                success: 0,
                message: "You cannot access this page!"
            });
        }
        next();
    },
    preventResponsable: (req, res, next) => {
        if(req.decoded.result.role === "responsable"){
            return res.status(403).json({
                success: 0,
                message: "You cannot access this page!"
            });
        }
        next();
    },
    AuthEtudiantAccess: (req, res, next) => {
        const id = req.params.id;
        if(req.decoded.result.role === "etudiant"){
            if(!etudiantCanView(req.decoded.result, Number(id))){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
        }
        next();
    },
    AuthEnseignantAccess: (req, res, next) => {
        if(req.decoded.result.role === 'enseignant'){
            if(!enseignantCanView(req.decoded.result, req.params.code)){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
        }
        next();
    },
    decideMiddleware: (req, res, next) => {
        const id = req.params.id;
        if(req.decoded.result.role === "etudiant"){
            if(!etudiantCanView(req.decoded.result, Number(id))){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
            next();
        }else if(req.decoded.result.role === "enseignant"){
            if(!enseignantCanView(req.decoded.result, req.params.code)){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
            next();
        } else{
            next();
        }
    }
};