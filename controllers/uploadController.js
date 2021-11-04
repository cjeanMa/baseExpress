const path = require("path");
const fs = require("fs");

var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { upload } = require("../helpers");
const { User, Product } = require("../models");

const uploadArchive = async (req, res) => {
    try {
        const archivo = await upload(req.files, undefined, "imgs");
        res.json({
            archivo
        })

    } catch (err) {
        res.status(500).json({
            error: err
        })
    }

}

const updateArchive = async (req, res) => {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case "usuario":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El id de usuario no existe ${id}`
                })
            }
            break;
        case "producto":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El id de producto no existe ${id}`
                })
            }
            break;
        default:
            return res.status(400).json({
                msg: "Aun falta desarrollar para tal coleccion"
            })
            break;
    }

    try {

        if (model.img) {
            let dir = path.join(__dirname, "../uploads", collection, model.img)
            if (fs.existsSync(dir)) {
                fs.unlinkSync(dir);
            }
        }

        const pathName = await upload(req.files, undefined, collection);

        model.img = pathName;
        await model.save()

        res.status(200).json({
            model
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al subir archivo"
        })
    }
}

const getArchive = async (req, res) => {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case "usuario":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El id de usuario no existe ${id}`
                })
            }
            break;
        case "producto":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El id de producto no existe ${id}`
                })
            }
            break;
        default:
            return res.status(400).json({
                msg: "Aun falta desarrollar para tal coleccion"
            })
            break;
    }



    if (model.img) {
        let dir = path.join(__dirname, "../uploads", collection, model.img)
        if (fs.existsSync(dir)) {
            return res.sendFile(dir)
        }
    }

    let pathDefault = path.join(__dirname, "../assets/no-image.jpg")
    res.sendFile(pathDefault)


}


const updateArchiveCloudinary = async (req, res) => {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case "usuario":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El id de usuario no existe ${id}`
                })
            }
            break;
        case "producto":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El id de producto no existe ${id}`
                })
            }
            break;
        default:
            return res.status(400).json({
                msg: "Aun falta desarrollar para tal coleccion"
            })
            break;
    }

    try {

        if (model.img) {
            let nameImage = model.img.split("/");
            nameImage = nameImage[nameImage.length - 1].split(".")[0];
            cloudinary.uploader.destroy(nameImage);
        }

        const {tempFilePath} = req.files.archive;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        

        model.img = secure_url;
        await model.save()

        res.status(200).json({
            model
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al subir archivo"
        })
    }
}


module.exports = {
    uploadArchive,
    updateArchive,
    getArchive,
    updateArchiveCloudinary
}