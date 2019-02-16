const jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwtKey');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, jwtKey.secret);
        req.userData = decodedToken;
        next();
    } catch (error){
        return res.status(401).json({
            message: 'É preciso estar logado para acessar essa funcionalidade'
        });
    }
};