const validateJWT = require("../middlewares/validate-jwt");
const validateFields = require("../middlewares/validate-fields");
const validateRoles = require("../middlewares/validate-rol");

module.exports ={
    ...validateJWT,
    ...validateFields,
    ...validateRoles
}