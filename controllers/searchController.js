
const { Product, Category, User} = require("../models");
const { ObjectId } = require("mongoose").Types;

const allowedCollections = {
    usuario: "user",
    categoria: "categoria",
    producto: "product",
    rol: "rol"
}

const searchUser = async (search = "", res) =>{
    const validation = ObjectId.isValid(search);
    if(validation){
        const user = await User.findById(search);
        return res.status(200).json({
            total: user ? 1 : 0,
            results: user ? [user] : []
        })
    }

    const regexp = new RegExp(search, "i");

    const [ total, users] = await Promise.all([
        User.countDocuments({
            $or:[{name: regexp}, {email:regexp}],
            $and:[{state:true}]
        }),
        User.find({
            $or:[{name: regexp}, {email:regexp}],
            $and:[{state:true}]
        })
    ])

    res.status(200).json({
        total,
        results: users
    })

}

const searchCategory = async (search, res) =>{
    const validation = ObjectId.isValid(search);
    if(validation){
        let category = await Category.findById(search);
        return res.status(200).json({
            total: category ? 1 : 0,
            results: category ? [category] : []
        })
    }

    let regexp = new RegExp(search, "i");

    let categories = await Category.find({
        name : regexp,
        state: true
    })

    res.status(200).json({
        total: categories ? categories.length : 0,
        results: categories ? categories : null
    })
} 

const searchProduct = async (search, res) =>{
    const validation = ObjectId.isValid(search);
    if(validation){
        let product = await Product.findById(search);
        return res.status(200).json({
            total: product ? 1 : 0,
            results: product ? [product] : []
        })
    }
    let regexp = new RegExp(search, "i");
    let products = await Product.find({
        state: true,
        $or:[
            {name: regexp},
            {description: regexp}
        ],
    })
    res.status(200).json({
        total: products ? products.length : 0,
        results : products ? products : null
    })


}



const searchInAll = (req, res) => {

    const { collection, search } = req.params;

    if (!Object.keys(allowedCollections).includes(collection)) {
        return res.status(400).json({
            msg: `colecciones permitidas ${Object.keys(allowedCollections)}`
        })
    }

    switch (collection) {
        case "usuario":
            searchUser(search, res);
            break;
        case "categoria":
            searchCategory(search, res);
            break;
        case "producto":
            searchProduct(search, res);
            break;
        default:
            res.status(500).json({
                msg: "Aun no fue desarrollado para tal coleccion"
            })
            break;
    }

}

module.exports = {
    searchInAll
}
