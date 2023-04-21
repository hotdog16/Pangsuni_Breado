const express = require("express");
const router = express.Router();
const { createProduct, addProduct } = require("../controllers/product");
const { addUser, login } = require("../controllers/user");
/* GET home page. */

router.get("/main", function (req, res, next) {
  res.render("index");
});
router.get("/", function (req, res, next) {
  res.render("index");
});
router.post("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.post("/login", login);

router.get("/join", function (req, res, next) {
  res.render("join", { title: "Express" });
});
router.post("/join", addUser);

router.get("/board", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/board", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/product", createProduct);
router.post("/product", addProduct);
module.exports = router;
