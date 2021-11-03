
const { Category } = require("../models");

const allCategories = async (req, res) =>{
    
    const {limit = 5, from = 0} = req.query
    let query = {state: true};
    
    let [total, categories] = await Promise.all(
        [
            Category.count(query),
            Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
        ]
    )

    res.json({
        total,
        categories
    })
} 

const detailCategory = async (req, res) =>{

    const { id } = req.params;
    console.log(id);
    let categoryDB = await Category.findById(id).populate({path: "user"});

    if(!categoryDB){
        return res.status(400).json({
            msg: "Categoria no encontrada en la BD"
        })
    }

    res.json({
        ...categoryDB._doc
    })
}

const addCategory = async (req, res) =>{
    try{
        const name = req.body.name.toLowerCase();
        let categoryDB  = await Category.findOne({name});
        if(categoryDB){
            return res.status(400).json({
                msg: `La categoria ${ categoryDB.name}, ya existe`
            })
        }
        let dataCategory = {
            name,
            user: req.userAuth._id
        }
        const category = new Category(dataCategory);
    
        await category.save()
        
        res.status(201).json({
            category
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        })
    }
    
} 

const updateCategory = async (req, res) =>{

    const { id } = req.params;
    let name  = req.body.name.toLowerCase();
    let query = {name, user:req.userAuth._id};

    let categoryDB = await Category.findByIdAndUpdate(id, query, {new: true});

    res.json({
        category: categoryDB,
        usuario: req.userAuth
    })
}

const deleteCategory = async (req, res) =>{

    const { id } = req.params;
    let query = {
        state:false,
        user: req.userAuth
    }
    let categoryDeleted = await Category.findByIdAndUpdate(id,query,{new: true});

    res.json({
        categoryDeleted
    })
}

module.exports = {
    allCategories,
    detailCategory,
    addCategory,
    updateCategory,
    deleteCategory
}