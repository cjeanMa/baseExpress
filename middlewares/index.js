const validateJWT = require("./validate-jwt");
const validateFields = require("./validate-fields");
const validateRoles = require("./validate-rol");
const validateArchives = require("./validate-archive");

module.exports ={
    ...validateJWT,
    ...validateFields,
    ...validateRoles,
    ...validateArchives
}