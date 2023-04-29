const express = require("express");
const router = express.Router();
const { adminOrder, adminProduct, adminMember, adminBoard, adminStore } = require("../controllers/admin");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/order", adminOrder);
router.get("/product", adminProduct);
router.get("/member", adminMember);
router.get("/board", adminBoard);
router.get("/store", adminStore);

module.exports = router;
