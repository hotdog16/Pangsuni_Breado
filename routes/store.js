const express = require("express");
const {detailStore, list, createStore, detailStoreTest, selectListRegionStores} = require("../controllers/store");
const {selectListRegions} = require("../controllers/region");
const {isLoggedIn} = require("../middlewares");
const axios = require('axios');

const router = express.Router();

router.get("/", isLoggedIn, selectListRegions);
// router.post("/:r_no", isLoggedIn, selectListRegionStores);
router.post("/", isLoggedIn, selectListRegionStores);
router.get("/add", isLoggedIn, createStore);

router.get("/detail/:no", isLoggedIn, detailStore);
router.post("/detail/:no", isLoggedIn, detailStore);

// axios.get('/detailTest/:no',detailStoreTest);

module.exports = router;
