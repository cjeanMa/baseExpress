
const {Schema, model} = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE", "SAILER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default:false
    }
})

//when we call the instanced object, it return toJSON function, and to handle this we can change of this way
UserSchema.methods.toJSON = function(){
    const {password, __v, ...user} = this.toObject();
    return user;
}

//adding a method personalized
UserSchema.methods.simple = function(){
    const {password, ...user} = this.toObject();
    return {password}
}

module.exports = model("User", UserSchema);