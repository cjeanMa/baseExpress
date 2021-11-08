const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, refreshToken } = require("../controllers/authController");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.post("/login", [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields
],login)

router.post("/google", [
    check("token_google", "El token de google es necesario").not().isEmpty(),
    validateFields
],googleSignIn)

router.get("/",[
    validateJWT
], refreshToken)

module.exports = router;