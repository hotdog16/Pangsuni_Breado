const express = require("express");
const router = express.Router();
const {createProduct, addProduct} = require('../controllers/product');
const {addUser} = require("../controllers/user");
const {singleUpload} = require('../middlewares/uploads');
const multer = require('multer');
const upload = multer({dest: '../public/images/'});
/* GET home page. */

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
router.get("/board", function (req, res, next) {
    res.render("board");
});
router.post("/board", function (req, res, next) {
    // 과정
    // db
    // 결과
    res.render("index", {title: "Express"});
});

router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});
router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});
router.get('/product', createProduct);
router.post('/product', singleUpload, addProduct);
module.exports = router;
