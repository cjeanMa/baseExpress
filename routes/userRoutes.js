const { Router } = require("express");
const {getUsers, postUsers, putUsers, deleteUser} = require("../controllers/userControllers");

const router = Router();

router.get("/", getUsers)
router.put("/:id", putUsers)
router.post("/", postUsers)
router.delete("/", deleteUser)


module.exports = router;