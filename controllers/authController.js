const { response, json } = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: "Email - Password no validos"
            })
        }
        if(!user.state){
            return res.status(400).json({
                msg: "Email - Password no validos - state:false "
            })
        }
        //Validating password with bcrypt
        const validPass = bcrypt.compareSync(password, user.password);
        if( !validPass){
            return res.status(400).json({
                msg: "Email - Password no validos - password"
            })
        }

        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "hable con el administrador"
        })
    }

}

const googleSignIn = async (req, res) =>{
    const { token_google } = req.body;

    try{

        const {email, name, picture} = await googleVerify( token_google );

        let user = await userModel.findOne({email});
        if(!user){
            let user = new userModel({
                name,
                email,
                password:"abc",
                state: true,
                google: true
            });
            await user.save();
        }
        if(!user.state){
            return res.status(401).json({
                msg: "Usuario bloqueado"
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
       
    }
    catch(err){
        res.status(400).json({
            ok: false,
            msg: "El Token no se pudo validar"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}