const express = require("express");
const { createProduct, addProduct, listProduct, modProduct, editProduct } = require("../controllers/product");
const { join, login, logout } = require("../controllers/auth");
const { renderJoin, renderMain, renderLogin } = require("../controllers/page");
const { mypage, mypageUpdate } = require("../controllers/mypage");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {addBoard, qnaList, aaaaa} = require("../controllers/board");
// const {singleUpload} = require('../middlewares/uploads');
// const {singleUpload} = require('../middlewares/uploads');
// const upload = multer({dest: '../public/images/'});
/* GET home page. */
// const upload = express().upload();

const router = express.Router();

try {
    fs.readFileSync('')
} catch (e) {
    console.error('');
}

router.get("/", renderMain);
router.post("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/login", renderLogin);
router.post("/login", isNotLoggedIn, login);

router.get("/join", isNotLoggedIn, renderJoin);
router.post("/join", isNotLoggedIn, join);

router.get("/logout", isLoggedIn, logout);

router.get("/mypage", isLoggedIn, mypage);

router.get("/mypage/update", isLoggedIn, mypageUpdate);


router.get("/main", function (req, res, next) {
    res.render("index");
});



router.get("/board", qnaList);
router.post("/board", addBoard);

router.get("/board/write", aaaaa);

// 지도 테스트 중
router.get("/map", (req, res) => {
    const mapAPI = process.env.KAKAO_MAP;
    console.log('appkey :', mapAPI);
    res.render('kakaoTest', {mapAPI});
});


module.exports = router;
