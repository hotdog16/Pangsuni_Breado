const express = require("express");
const {detailStore, list, createStore} = require("../controllers/store");
const {isLoggedIn} = require("../middlewares");

const router = express.Router();

router.get("/", isLoggedIn, list);

router.get("/add", isLoggedIn, createStore);

router.get("/detail/:no", isLoggedIn, detailStore);

module.exports = router;
