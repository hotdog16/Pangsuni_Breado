const express = require("express");
const {createProduct, addProduct, listProduct, modProduct, editProduct} = require('../controllers/product');
const {addUser} = require("../controllers/user");
const {uerRegExp} = require('../middlewares/regExpCheck');
const {addBoard, qnaList, aaaaa} = require("../controllers/board");
const {notice} = require("../controllers/notice");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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


router.get('/', function (req, res, next) {
    res.render('index');
});
router.post("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});

router.get("/main", function (req, res, next) {
    res.render("index");
});

router.get("/login", function (req, res, next) {
    res.render("login");
});
router.post("/login", function (req, res, next) {
    res.render("index", {title: "Express"});
});

router.get("/join", function (req, res, next) {
    res.render("join", {title: "Express"});
});
router.post("/join", addUser);

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
