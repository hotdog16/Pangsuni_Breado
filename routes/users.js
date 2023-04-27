var express = require("express");
var router = express.Router();
const { users } = require("../models");

const { mypage, mypageUpdate, mypageUpdateAdd } = require("../controllers/mypage");
const { isLoggedIn } = require("../middlewares");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/mypage", isLoggedIn, mypage);

router.get("/mypage/update", isLoggedIn, mypageUpdate);
router.post("/mypage/update", isLoggedIn, mypageUpdateAdd);

module.exports = router;
