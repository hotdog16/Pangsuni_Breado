const express = require("express");
const router = express.Router();
const {
    memberdetail,
    deleteMember,
    DetailMember,
    adminMember,
    adminBoard,
    adminBoard2,
    deleteBoard,
    member,
    deleteComment,
    adminHome
} = require("../controllers/admin");
const {addFormBoard, adminModifyBoard, adminModifyBoardPost} = require('../controllers/admin/adminBoard');
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

// board
router.get("/board", isLoggedIn, whoisAdmin, adminBoard); // 화면이동

router.get("/board2", isLoggedIn, whoisAdmin, adminBoard2); // axios를 이용한 비동기 (이름 바꿔야함)

router.get("/board/add", isLoggedIn, whoisAdmin, addFormBoard);

router.post("/board/delete", isLoggedIn, whoisAdmin, deleteBoard);

router.get("/board/modify/:b_no", isLoggedIn, whoisAdmin, adminModifyBoard);
router.post("/board/modify", isLoggedIn, whoisAdmin, adminModifyBoardPost);


router.post('/comment/delete', deleteComment);


// router.get("/store", adminStore);
// router.get('/store/selectList', selectListStore);
module.exports = router;
