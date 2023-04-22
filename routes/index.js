const express = require("express");
const {createProduct, addProduct} = require('../controllers/product');
const {addUser} = require("../controllers/user");
const {addBoard, qnaList ,aaaaa} = require("../controllers/board");
const {singleUpload} = require('../middlewares/uploads');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const upload = multer({dest: '../public/images/'});
/* GET home page. */
// const upload = express().upload();

const router = express.Router();

try{
    fs.readFileSync('')
}catch (e) {
    console.error('');
}



router.get("/main", function (req, res, next) {
    res.render("index");
});
router.get('/', function (req, res, next) {
    res.render('index');

});
router.post("/", function (req, res, next) {
    res.render("index", {title: "Express"});
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

router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});
router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});
router.get('/product', createProduct);
router.post('/product',  addProduct);
// router.post('/product', singleUpload, addProduct);
module.exports = router;
