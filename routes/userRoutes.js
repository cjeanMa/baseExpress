const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, postUsers, putUsers, deleteUser } = require("../controllers/userControllers");
const { RoleValidator, EmailValidator, existUserById } = require("../helpers/db-validators");
const {
    validateJWT,
    validateFields,
    validateRolAdmin,
    haveRol
} = require("../middlewares/index")

const router = Router();

router.get("/", getUsers)
router.put("/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    check("rol").custom(RoleValidator),
    validateFields
], putUsers)
router.post("/", [
    check("name", "El nombre es un campo obligatorio").not().isEmpty(),
    check("password", "El campo password es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 letras").isLength({ min: 6 }).not().isEmpty(),
    check("email", "Formato de email no valido").isEmail(),
    check("email").custom(EmailValidator),
    check("rol").custom(RoleValidator),
    validateFields
], postUsers)
router.delete("/:id", [
    validateJWT,
    haveRol("SAILER_ROLE", "USER_ROLE", "ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    validateFields
], deleteUser)


module.exports = router;