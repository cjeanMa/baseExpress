const { Router } = require("express");
const { uploadArchive } = require("../controllers/uploadController");

const router = Router();

router.post("/", uploadArchive);

module.exports = router;