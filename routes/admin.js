const express = require("express");
const router = express.Router();
const { adminOrder, adminProduct, adminMember, adminBoard, adminStore,adminBoard2,deleteBoard } = require("../controllers/admin");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/order", adminOrder);

router.get("/product", adminProduct);

router.get("/member", adminMember);

router.get("/board", adminBoard); // 화면이동
router.get("/board2", adminBoard2); // axios를 이용한 비동기 (이름 바꿔야함)
router.post("/board/delete", deleteBoard);

router.get("/store", adminStore);

module.exports = router;
