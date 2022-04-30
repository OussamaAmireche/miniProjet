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
            if(req.decoded.result.role === "etudiant"){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
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
    preventEnseignant: (req, res, next) => {
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
            if(req.decoded.result.role === "enseignant"){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
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
    preventResponsable: (req, res, next) => {
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
            if(req.decoded.result.role === "responsable"){
                return res.status(403).json({
                    success: 0,
                    message: "You cannot access this page!"
                });
            }
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
    AuthEtudiantAccess: (req, res, next) => {
        let token = req.get("authorization");
        const id = req.params.id;
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
            if(req.decoded.result.role === "etudiant"){
                if(!etudiantCanView(req.decoded.result, Number(id))){
                    return res.status(403).json({
                        success: 0,
                        message: "You cannot access this page!"
                    });
                }
            }
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
    AuthEnseignantAccess: (req, res, next) => {
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
            if(req.decoded.result.role === 'enseignant'){
                if(!enseignantCanView(req.decoded.result, req.params.code)){
                    return res.status(403).json({
                        success: 0,
                        message: "You cannot access this page!"
                    });
                }
            }
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
    decideMiddleware: (req, res, next) => {
        let token = req.get("authorization");
        const id = req.params.id;
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
        });
        } else {
        return res.status(401).json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
        }
    }
};