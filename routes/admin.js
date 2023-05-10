const express = require("express");
const router = express.Router();
const {
  memberdetail,
  deleteMember,
  DetailMember,
  adminMember,
  member,
  adminHome
} = require("../controllers/admin");
const {isLoggedIn, whoisAdmin} = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", isLoggedIn,whoisAdmin, adminHome);

router.get("/member", isLoggedIn, whoisAdmin, adminMember);
router.get("/member/select", isLoggedIn, whoisAdmin, member);

router.get("/member/detail/:u_no", isLoggedIn, whoisAdmin, memberdetail);
router.post("/member/detail/:u_no", isLoggedIn, whoisAdmin, DetailMember);

router.post("/member/delete", isLoggedIn, whoisAdmin, deleteMember)

module.exports = router;
