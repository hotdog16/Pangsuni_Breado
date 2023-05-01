const express = require("express");
const { regions, stores, products, board } = require("../models");
const router = express.Router();

const {BoardList, BoardWrite, BoardForm, BoardView, CommentWrite, CommentView, CommentAdd, DeleteBoardList} = require("../controllers/board");
// 여기는 주소가 http://localhost:3000/board/ get방식 qnaList
// 여기는 주소가 http://localhost:3000/board/ poet방식 addBoard
router.get("/", BoardList); // 게시판 리스트로이동
router.post("/", BoardList); // 게시판 리스트로이동
// router.get("/list", BoardList); // 상단과 동일한 경로임 /가 /list와 같음

// router.get("/writeform", BoardForm);

router.get("/write", BoardForm); // 게시판 글쓰기 창
router.post("/write", BoardWrite); // 게시판 글 등록하기

router.get("/view/:no",BoardView);
router.get("/delete/:b_no", DeleteBoardList);
router.post("/delete/:b_no", DeleteBoardList);

router.post("/commentswrite", CommentWrite);

router.get("/commentsview/:no", CommentView);

router.post("/commentsview/:no", CommentAdd);
// router.post("/listpaging", qnaListPaging);

module.exports = router;
