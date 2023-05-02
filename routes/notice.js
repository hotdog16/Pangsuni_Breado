const express = require("express");
const { regions, stores, products, board } = require("../models");
const {NoticeList, NoticeWrite, NoticeForm} = require("../controllers/notice");
// const {NoticeView} = require("../controllers/qna");
const router = express.Router();

// 여기는 주소가 http://localhost:3000/notice/ get방식 noticeList
// 여기는 주소가 http://localhost:3000/notice/ post방식 addBoard
router.get("/notice", NoticeList); // 공지사항 리스트로 이동
router.post("/notice", NoticeList); // 공지사항 리스트로 이동
// router.get("/list", NoticeList); // 상단과 동일한 경로임 /가 /list와 같음

// router.get("/notice_write", NoticeForm); // 게시판 글쓰기 창
// router.post("/notice_write", NoticeWrite); // 게시판 글 등록하기

// router.get("/view/:no",BoardView);


router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* GET users listing. */

module.exports = router;
