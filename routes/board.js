const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middlewares/index')
const {
    selectListBoard,
    addBoard,
    formBoard,
    selectOneBoard,
    CommentView,
    CommentWrite,
    CommentAdd,
    deleteBoard,
    test2,
    modifyFormBoard,
    modifyBoard
} = require("../controllers/board");
// 여기는 주소가 http://localhost:3000/board/ get방식 qnaList
// 여기는 주소가 http://localhost:3000/board/ poet방식 addBoard
router.get("/list/:bt_no", selectListBoard); // 게시판 리스트로이동
router.post("/", selectListBoard); // 게시판 리스트로이동
// router.get("/list", BoardList); // 상단과 동일한 경로임 /가 /list와 같음

router.get("/qnaadd/:bt_no",isLoggedIn, formBoard); // 게시판 글쓰기 창
router.post("/add",isLoggedIn, addBoard); // 게시판 글 등록하기
router.get("/view/:no",selectOneBoard);

router.get("/delete/:b_no", deleteBoard);
router.post("/delete/:b_no", deleteBoard);

router.get("/modify/:b_no", modifyFormBoard);
router.post("/modify", modifyBoard);

// 댓글 기능은 따로 router와 컨트롤러 만들어야 함
router.get("/commentsview/:no", CommentView);

router.post("/commentswrite", CommentWrite);

router.post("/commentsview/:no", CommentAdd);
// router.post("/listpaging", qnaListPaging);
// router.get("/test", test); // 게시판 리스트로이동
router.get("/test2/:bt_no", test2); // 게시판 리스트로이동

module.exports = router;
