const { Router } = require("express");
const { check } = require("express-validator");
const { allCategories, 
    detailCategory, 
    addCategory, 
    updateCategory, 
    deleteCategory } = require("../controllers/categoryController");
const { existCategoryId } = require("../helpers/db-validators");
const { validateJWT, haveRol, validateFields } = require("../middlewares");

const router = Router();

router.get("/",allCategories);

router.get("/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existCategoryId),
    validateFields
],detailCategory);

router.post("/", [
    validateJWT,
    haveRol("ADMIN_ROLE"),
    check("name", "El nombre de categoria es obligatorio").not().isEmpty(),
    validateFields
],addCategory);

router.put("/:id",[
    validateJWT,
    haveRol("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existCategoryId),
    validateFields
],updateCategory);

router.delete("/:id",[
    validateJWT,
    haveRol("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existCategoryId),
    validateFields
],deleteCategory);


module.exports = router;