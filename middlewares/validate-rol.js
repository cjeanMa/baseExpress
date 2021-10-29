const { response, request } = require("express")

const validateRolAdmin = (req = request, res = response, next) => {
    if (!req.userAuth) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        })
    }

    const { rol, name } = req.userAuth;

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `El usuario ${name} no tiene rol de administrador`
        })
    }
    next();
}

const haveRol = (...roles) => {
    return (req = require, res = response, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            })
        }
        if (!roles.includes(req.userAuth.rol)) {
            return res.status(401).json({
                msg: "No tiene privilegios para esta accion"
            })
        }
        next();
    }
}

module.exports = {
    validateRolAdmin,
    haveRol
}