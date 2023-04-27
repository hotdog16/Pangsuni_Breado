const express = require("express");
const { createProduct, addProduct, listProduct, modProduct, editProduct } = require("../controllers/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { users } = require("../models");

const { uerRegExp } = require("../middlewares/regExpCheck");
const { notice } = require("../controllers/notice");

const { join, login, logout, idCheck, emailCheck } = require("../controllers/auth");
const { renderJoin, renderMain, renderLogin } = require("../controllers/page");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
// const {addBoard, qnaList, aaaaa, bbbbb} = require("../controllers/board");
// const {singleUpload} = require('../middlewares/uploads');
// const {singleUpload} = require('../middlewares/uploads');
// const uploads = multer({dest: '../public/images/'});
/* GET home page. */
// const uploads = express().uploads();

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

router.post("/idCheck", idCheck);
router.post("/emailCheck", emailCheck);

router.get("/logout", isLoggedIn, logout);
// router.post("/logout", isLoggedIn, logout);

router.get("/admin", (req, res) => {
  res.render("admin", { title: "Express" });
});

// router.get("/board", qnaList);
// router.post("/board", addBoard);

// router.get("/board/write", aaaaa);
// router.get("/board/comments", bbbbb);

// 지도 테스트 중
router.get("/map", (req, res) => {
  const mapAPI = process.env.KAKAO_MAP;
  res.render("kakaoTest", { mapAPI });
});
router.get("/map2", (req, res) => {
  const mapAPI = process.env.KAKAO_MAP;
  res.render("kakaoTest2", { mapAPI });
});

module.exports = router;
