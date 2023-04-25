const express = require("express");
const { createProduct, addProduct, listProduct, modProduct, editProduct } = require("../controllers/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { uerRegExp } = require("../middlewares/regExpCheck");
const { notice } = require("../controllers/notice");

const { join, login, logout } = require("../controllers/auth");
const { renderJoin, renderMain, renderLogin } = require("../controllers/page");
const { mypage, mypageUpdate, mypageUpdateAdd } = require("../controllers/mypage");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { addBoard, qnaList, aaaaa } = require("../controllers/board");
// const {singleUpload} = require('../middlewares/uploads');
// const {singleUpload} = require('../middlewares/uploads');
// const upload = multer({dest: '../public/images/'});
/* GET home page. */
// const upload = express().upload();
const { users } = require("../models");

const router = express.Router();

try {
  fs.readFileSync("");
} catch (e) {
  console.error("");
}

router.get("/", renderMain);
router.post("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", renderLogin);
router.post("/login", isNotLoggedIn, login);

router.get("/join", isNotLoggedIn, renderJoin);
router.post("/join", isNotLoggedIn, join);

router.post("/join/idCheck", (req, res) => {
  const { user } = req.body;
  console.log(req.body);
  const idCheck = user.filter((users) => users === user).length;
  if (idCheck) {
    res.send(false);
  } else {
    res.send(true);
  }
});

router.get("/logout", isLoggedIn, logout);
// router.post("/logout", isLoggedIn, logout);

router.get("/mypage", isLoggedIn, mypage);

router.get("/mypage/update", isLoggedIn, mypageUpdate);
router.post("/mypage/update", isLoggedIn, mypageUpdateAdd);

router.get("/admin", function (req, res) {
  res.render("admin", { title: "Express" });
});
router.get("/board", qnaList);
router.post("/board", addBoard);

router.get("/board/write", aaaaa);

// 지도 테스트 중
router.get("/map", (req, res) => {
  const mapAPI = process.env.KAKAO_MAP;
  res.render("kakaoTest", { mapAPI });
});
router.get("/map2", (req, res) => {
  const mapAPI = process.env.KAKAO_MAP;
  res.render("kakaoTest2", { mapAPI });
});

router.post("/idCheck", async (req, res, next) => {
  const { id } = req.body;
  console.log("join--------1>", id);

  const idCheck = await users.findOne({
    where: {
      u_id: id,
    },
  });

  console.log("join--------2>", idCheck);

  if (idCheck == null) {
    return res.status(200).json({ msg: "사용가능" });
  } else {
    return res.status(300).json({ msg: "아이디 중복" });
  }
});

module.exports = router;
