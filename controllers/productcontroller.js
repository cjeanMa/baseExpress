const { Product } = require("../models")

const getAllProducts = async (req, res) => {

    const { limit = 5, from = 0} = req.query;
    const query = { state: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .skip(from)
        .limit(limit)
        .populate("user", "name")
        .populate("category", "name")
    ])

    res.json({
        total,
        products
    })
}

const detailProduct = async (req, res) => {
    
    const { id } = req.params;

    const productDB = await Product.findById(id)        
                            .populate("user", "name")
                            .populate("category", "name");

    if(!productDB){
        return res.status(400).json({
            msg: "Registro no encontrado"
        })
    }
    res.json({
        ...productDB.simple()
    })
}

const addProduct = async (req, res) => {
    try {
        const { price, category, description } = req.body;
        let name = req.body.name.toLowerCase();
        const productDB = await Product.find({name});
        if(productDB){
            return res.status(400).json({
                msg: "El producto ya existe en la BD"
            })
        }

        let dataProduct = {
            name,
            price,
            category,
            description,
            user: req.userAuth._id
        }

        let product = new Product(dataProduct);

        await product.save();
        res.status(201).json({
            product
        })
    }
    catch (err) {
        console.log(err),
            res.status(500).json({
                msg: "Problemas al crear producto"
            })
    }
}

const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { description, price, category, enabled} = req.body;
        const name = req.body.name.toLowerCase();
    
        let dataProduct = {
            name,
            price,
            category,
            description,
            user: req.userAuth._id,
            enabled
        }
    
        let product = await Product.findByIdAndUpdate(id, dataProduct,{new: true});
    
        res.json({
            product
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            msg: "Error al actualizar registro producto"
        })
    }
}

const deleteProduct = async (req, res) => {

    const { id } = req.params;
    let query = { state: false}
    let producto = await Product.findByIdAndUpdate(id, query, {new:true})

    res.json({
        producto
    })
}

module.exports = {
    getAllProducts,
    detailProduct,
    addProduct,
    updateProduct,
    deleteProduct
}