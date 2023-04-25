const express = require("express");
const { createProduct, addProduct, listProduct, modProduct, editProduct } = require("../controllers/product");

const { uerRegExp } = require("../middlewares/regExpCheck");
const { addBoard, qnaList, aaaaa } = require("../controllers/board");
const { notice } = require("../controllers/notice");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { join, login, logout } = require("../controllers/auth");
const { renderJoin, renderMain, renderLogin } = require("../controllers/page");
const { mypage, mypageUpdate } = require("../controllers/mypage");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");





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

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.get("/main", function (req, res, next) {
  res.render("index");
});



router.get("/board", qnaList);
router.post("/board", addBoard);

router.get("/board/write", aaaaa);

// 지도 테스트 중
router.get("/map", (req, res) => {
    const mapAPI = process.env.KAKAO_MAP;
    res.render('kakaoTest', {mapAPI});
});
router.get("/map2", (req, res) => {
  const mapAPI = process.env.KAKAO_MAP;
  res.render('kakaoTest2', {mapAPI});
});

module.exports = router;
