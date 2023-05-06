const express = require("express");
const router = express.Router();
const { deleteMember, DetailMember,adminOrder, adminProduct, adminMember, adminBoard, adminStore,adminBoard2,deleteBoard, member,selectListStore} = require("../controllers/admin");
const {selectOneProduct} = require("../controllers/product");


router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/order", adminOrder);

router.get("/product", selectOneProduct);

router.get("/member", adminMember);
router.get("/member/select", member);
router.get("/member/detail/:no", DetailMember);
// router.get("/memberDetailOrder/:id", DetailOrderMember);
router.post("/member/delete", deleteMember)

router.get("/board", adminBoard); // 화면이동
router.get("/board2", adminBoard2); // axios를 이용한 비동기 (이름 바꿔야함)
router.post("/board/delete", deleteBoard);



// router.get("/store", adminStore);
// router.get('/store/selectList', selectListStore);
module.exports = router;
