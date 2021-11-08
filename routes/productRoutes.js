const { Router } = require("express");
const {getAllProducts,
        detailProduct,
        addProduct,
        updateProduct,
        deleteProduct} = require("../controllers/productController")
const { check } = require("express-validator");
const { validateFields, validateJWT, haveRol } = require("../middlewares");
const { existCategoryId, existProductId } = require("../helpers/db-validators");

const router = Router();

router.get("/", getAllProducts);

router.get("/:id",[
    check("id", "Id no valido").isMongoId(),
    validateFields
], detailProduct);
router.post("/",[
    validateJWT,
    haveRol("ADMIN_ROLE"),
    check("name", "El nombre es necesario").not().isEmpty(),
    check("category").custom(existCategoryId),
    validateFields
] ,addProduct);
router.put("/:id",[
    validateJWT,
    haveRol("ADMIN_ROLE"),
    check("id", "Id no valido").isMongoId(),
    check("id").custom(existProductId),
    validateFields
], updateProduct);
router.delete("/:id",[
    validateJWT,
    haveRol("ADMIN_ROLE"),
    check("id", "Id no valido").isMongoId(),
    check("id").custom(existProductId),
    validateFields
], deleteProduct);

module.exports = router;