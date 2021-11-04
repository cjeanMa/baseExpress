

const dbValidator = require("./db-validators");
const generateJWT = require("./generateJWT");
const googleVerify = require("./google-verify");
const uploadArchive = require("./upload-archives");

module.exports = {
    ...dbValidator,
    ...generateJWT,
    ...googleVerify,
    ...uploadArchive
}