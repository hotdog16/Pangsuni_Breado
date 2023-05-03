var express = require("express");
var router = express.Router();
const { users } = require("../models");

const { mypage, modifyMypage, modifyAddMypage,deleteUser } = require("../controllers/mypage");
const { isLoggedIn } = require("../middlewares");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/mypage", isLoggedIn, mypage);

router.get("/mypage/modify", isLoggedIn, modifyMypage);
router.post("/mypage/modify", isLoggedIn, modifyAddMypage);

router.get("/mypage/delete", isLoggedIn)
router.get("/mypage/delete", isLoggedIn, deleteUser)

module.exports = router;
