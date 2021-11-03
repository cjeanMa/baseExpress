const {Rol, User, Category, Product} = require("../models");

const RoleValidator = async(rol="")=>{
    const existRol = await Rol.findOne({ rol });
    if(!existRol)
        throw new Error(`El rol ${rol} no existe`)
}

const EmailValidator = async(email="")=>{
    const eEmail = await User.findOne({ email })
    if(eEmail){
        throw new Error(`El correo ${email} ya esta registrado`)
    }
}

const existUserById = async(id = "") =>{
    const user = await User.findById(id)
    if(!user){
        throw new Error(`El usuario no existe`)
    }
}

const existCategoryId = async(id="") => {
    const category = await Category.findById(id);
    if(!category){
        throw new Error("La categoria no existe")
    }
}

const existProductId = async(id="")=>{
    const product = await Product.findById(id);
    if(!product)
        throw new Error("Producto no existe")
}

module.exports = {
    RoleValidator,
    EmailValidator,
    existUserById,
    existCategoryId,
    existProductId
}