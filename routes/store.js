const express = require("express");
const { detailStore, list } = require("../controllers/store");

const router = express.Router();

router.get("/", list);

router.get("/detail/:no", detailStore);

module.exports = router;
