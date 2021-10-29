const { request } = require("express");
const userModel = require("../models/userModel");
 
const jwt = require("jsonwebtoken");

const validateJWT = async (req=request, res, next) =>{

    const token = req.header("j-token");
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try{
        const { uid } = jwt.verify(token,process.env.KEY_JWT);
        
        let userAuth = await userModel.findById(uid);

        if(!userAuth){
            return res.json({
                msg: "Usuario no exite en la DB"
            })
        }

        if(!userAuth.state){
            return res.json({
                msg: "Token no valido - usuario con estado: false"
            })
        }
        
        req.userAuth = userAuth;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            msg:"Token no valido"
        })
    }

}

module.exports = {
    validateJWT
}