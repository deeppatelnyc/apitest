const { createUser } = require("./user.controller");
const { checkId } = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);

module.exports = router;