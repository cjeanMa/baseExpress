const RolModel = require("../models/rolModel");
const UserModel = require("../models/userModel");

const RoleValidator = async(rol="")=>{
    const existRol = await RolModel.findOne({ rol });
    if(!existRol)
        throw new Error(`El rol ${rol} no existe`)
}

const EmailValidator = async(email="")=>{
    const eEmail = await UserModel.findOne({ email })
    if(eEmail){
        throw new Error(`El correo ${email} ya esta registrado`)
    }
}

const existUserById = async(id = "") =>{
    const user = await UserModel.findById(id)
    if(!user){
        throw new Error(`El usuario no existe`)
    }
}

module.exports = {
    RoleValidator,
    EmailValidator,
    existUserById
}