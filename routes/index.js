const express = require("express");
const { createProduct, addProduct, listProduct, modProduct, editProduct } = require("../controllers/product");
const { join, login, logout } = require("../controllers/auth");
const { renderJoin, renderMain, renderLogin } = require("../controllers/page");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
// const {singleUpload} = require('../middlewares/uploads');
// const {singleUpload} = require('../middlewares/uploads');
// const upload = multer({dest: '../public/images/'});
/* GET home page. */
// const upload = express().upload();

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

module.exports = router;
