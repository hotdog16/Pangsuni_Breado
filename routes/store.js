const express = require("express");
const {detailStore, list, createStore, detailStoreTest} = require("../controllers/store");
const {isLoggedIn} = require("../middlewares");
const axios = require('axios');

const router = express.Router();

router.get("/", isLoggedIn, list);

router.get("/add", isLoggedIn, createStore);

router.get("/detail/:no", isLoggedIn, detailStore);
router.post("/detail/:no", isLoggedIn, detailStore);

// axios.get('/detailTest/:no',detailStoreTest);

module.exports = router;
