const express = require("express");
const { createProduct, addProduct, listProduct, modProduct, editProduct } = require("../controllers/product");
const { addOrder } = require("../controllers/order");
const { uerRegExp } = require("../middlewares/regExpCheck");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post("/add", addOrder);

module.exports = router;
