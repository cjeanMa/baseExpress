
const { upload } = require("../helpers")

const uploadArchive = async (req, res) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }
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

module.exports = {
    uploadArchive
}