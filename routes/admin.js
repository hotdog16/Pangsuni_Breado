const express = require("express");
const router = express.Router();
const { memberdetail,deleteMember, DetailMember, adminMember, adminBoard,adminBoard2,deleteBoard, member, deleteComment} = require("../controllers/admin");
const {selectOneProduct} = require("../controllers/product");


router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// router.get("/order", adminOrder);
// router.get("/order/selectList", selectListOrder);
router.get("/product", selectOneProduct);

router.get("/member", adminMember);
router.get("/member/select", member);
// router.get("/member/detail/:u_no", memberdetail);
router.get("/member/detail/:u_no", memberdetail);
router.post("/member/detail/:u_no", DetailMember);
// router.get("/memberDetailOrder/:id", DetailOrderMember);
router.post("/member/delete", deleteMember)

router.get("/board", adminBoard); // 화면이동
router.get("/board2", adminBoard2); // axios를 이용한 비동기 (이름 바꿔야함)
router.post("/board/delete", deleteBoard);
router.post('/comment/delete', deleteComment);



// router.get("/store", adminStore);
// router.get('/store/selectList', selectListStore);
module.exports = router;
