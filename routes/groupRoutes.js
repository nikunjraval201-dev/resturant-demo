const express = require("express");
const router = express.Router();

const { getGroupMenu } = require("../controllers/groupController");

router.get("/", getGroupMenu);

module.exports = router;
