var express = require("express");
var router = express.Router();
const { users } = require("../models");

const { mypage, modifyMypage, modifyAddMypage,deleteUser } = require("../controllers/mypage");
const { isLoggedIn } = require("../middlewares");
const {findPwd,findUser} = require("../controllers/auth")

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/findpwd',findUser);
router.post('/findpwd',findPwd);

router.get("/mypage", isLoggedIn, mypage);

router.get("/mypage/modify", isLoggedIn, modifyMypage);
router.post("/mypage/", isLoggedIn, modifyAddMypage);

router.get("/mypage/delete", isLoggedIn)
router.get("/mypage/delete", isLoggedIn, deleteUser)

module.exports = router;
