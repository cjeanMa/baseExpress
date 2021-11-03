const { Router } = require("express");
const { searchInAll} = require("../controllers/searchController")

const router = Router();

router.get("/:collection/:search", searchInAll);

module.exports = router;
