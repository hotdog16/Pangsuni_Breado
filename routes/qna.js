const express = require("express");
const { regions, stores, products, board } = require("../models");
const router = express.Router();

// const {BoardList, BoardWrite, BoardForm, BoardView, CommentWrite, CommentView, CommentAdd, DeleteBoardList, ModifyBoardList} = require("../controllers/qna");
const {QnaList, QnaAdd, QnaForm, QnaView, CommentView, CommentWrite, CommentAdd, DeleteQnaList, ModifyQnaList, selectList} = require("../controllers/qna");
// 여기는 주소가 http://localhost:3000/board/ get방식 qnaList
// 여기는 주소가 http://localhost:3000/board/ poet방식 addBoard
router.get("/", QnaList); // 게시판 리스트로이동
router.post("/", QnaList); // 게시판 리스트로이동
// router.get("/list", BoardList); // 상단과 동일한 경로임 /가 /list와 같음

// router.get("/writeform", BoardForm);

router.get("/qnaadd", QnaForm); // 게시판 글쓰기 창
router.post("/qnaadd", QnaAdd); // 게시판 글 등록하기
router.get("/view/:no",QnaView);

router.get("/delete/:b_no", DeleteQnaList);
router.post("/delete/:b_no", DeleteQnaList);

// router.get("/modify/:b_no", ModifyQnaList);
// router.post("/modify/:b_no", ModifyQnaList);

router.get("/commentsview/:no", CommentView);

router.post("/commentswrite", CommentWrite);

router.post("/commentsview/:no", CommentAdd);
// router.post("/listpaging", qnaListPaging);

router.post('/search', selectList);


module.exports = router;
