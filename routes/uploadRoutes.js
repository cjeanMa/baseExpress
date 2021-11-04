const { Router } = require("express");
const { check } = require("express-validator");
const { uploadArchive, updateArchive, getArchive, updateArchiveCloudinary } = require("../controllers/uploadController");
const { validateFields, validateArchive } = require("../middlewares");
const { allowCollectionUpdate } = require("../helpers");

const router = Router();

router.post("/", validateArchive, uploadArchive);
router.put("/:collection/:id", [
    check("id", "No es un id valido").isMongoId(),
    check("collection").custom(c => allowCollectionUpdate(c, ["usuario", "producto"])),
    validateFields,
    validateArchive
], updateArchiveCloudinary);

router.get("/:collection/:id",[ 
    check("id", "No es un id valido").isMongoId(),
    check("collection").custom(c => allowCollectionUpdate(c, ["usuario", "producto"])),
    validateFields
], getArchive);

module.exports = router;