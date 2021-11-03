const { Schema, model} = require("mongoose");
const userModel = require("./userModel");

const ProductSchema = Schema ({
    name: {
        type: String,
        required: [true, "el nombre del producto es necesario"],
        unique: true
    },
    state:{
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El id de usuario es necesario"]
    },
    price:{
        type: Number,
        default: 0,
        required: [true, "El precio es necesario"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:"Categoria",
        required: [true, "el id de categoria es necesario"]
    },
    description:{
        type: String,
    },
    enabled:{
        type: Boolean,
        default: true
    }

})

ProductSchema.methods.toJSON = function(){
    const { __v, state, ...product} = this.toObject();
    return product;
}

ProductSchema.methods.simple = function(){
    const { __v, state, ...product} = this.toObject();
    return product;
}

module.exports = model("Product", ProductSchema);

