const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.KEY_JWT, {
            expiresIn: "1h"
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            }
            else {
                resolve(token);
            }
        })
    })
}

const verifyJWT = async (token = "") => {
    try {
        if (token.length < 10) {
            return null;
        }

        const payload = jwt.verify(token, process.env.KEY_JWT);

        const user = await User.findById(payload.uid);

        if(user){
            if(user.state){
                return user;
            }
        }
        else{
            return null
        }

    } catch (error) {
        console.log(error)
        return null;
    }

}

module.exports = {
    generateJWT,
    verifyJWT
}