const express = require("express");
const router = express.Router();
const { DetailOrderMember,DetailMember, adminOrder, adminProduct, adminMember, adminBoard, adminStore, member } = require("../controllers/admin");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/order", adminOrder);

router.get("/product", adminProduct);

router.get("/member", adminMember);
router.get("/memberDetail/:id", DetailMember);
router.get("/memberDetailOrder/:id", DetailOrderMember);
router.post("/member", member)

router.get("/board", adminBoard);

router.get("/store", adminStore);

module.exports = router;
