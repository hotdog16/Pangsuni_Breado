const express = require("express");
const { regions, stores, products, board } = require("../models");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");

const { BoardList, BoardWrite, BoardForm, BoardView, CommentWrite, CommentView, CommentAdd } = require("../controllers/board");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 여기는 주소가 http://localhost:3000/board/ get방식 qnaList
// 여기는 주소가 http://localhost:3000/board/ poet방식 addBoard
router.get("/", BoardList);

router.get("/list", BoardList);

// router.get("/writeform", BoardForm);

router.get("/write", BoardForm); // 게시판 글쓰기 창
router.post("/write", BoardWrite); // 게시판 글 등록하기

router.get("/view/:no", BoardView);

router.post("/commentswrite", CommentWrite);

router.get("/commentsview/:no", CommentView);

router.post("/commentsview/:no", CommentAdd);
// router.post("/listpaging", qnaListPaging);

module.exports = router;
