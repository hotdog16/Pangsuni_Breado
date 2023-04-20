const express = require("express");
const router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get("/main", function (req, res, next) {
  res.render("index");
=======
router.get('/', function (req, res, next) {
    res.render('index');
>>>>>>> e543ca490c731d3cbd3d55c4668544b9256ecde7
});
router.post("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.post("/login", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/join", function (req, res, next) {
  res.render("join", { title: "Express" });
});
router.post("/join", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/board", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/board", function (req, res, next) {
  res.render("index", { title: "Express" });
});
<<<<<<< HEAD
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
=======
router.get('/product', function (req, res, next) {
    res.render('product');
>>>>>>> e543ca490c731d3cbd3d55c4668544b9256ecde7
});
module.exports = router;
