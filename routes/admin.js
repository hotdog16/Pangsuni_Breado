const express = require("express");
const router = express.Router();
const {
  memberdetail,
  deleteMember,
  DetailMember,
  adminMember,
  member
} = require("../controllers/admin");
const {isLoggedIn, whoisAdmin} = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// router.get("/order", adminOrder);
// router.get("/order/selectList", selectListOrder);
// router.get("/product", selectOneProduct);
// router.get("/product/selectList", selectListProduct);

router.get("/member", adminMember);
router.get("/member/select", member);
// router.get("/member/detail/:u_no", memberdetail);
router.get("/member/detail/:u_no", memberdetail);
router.post("/member/detail/:u_no", DetailMember);
// router.get("/memberDetailOrder/:id", DetailOrderMember);
router.post("/member/delete", deleteMember)

// router.get("/store", adminStore);
// router.get('/store/selectList', selectListStore);
module.exports = router;
