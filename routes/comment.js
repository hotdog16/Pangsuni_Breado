const express = require("express");
const {selectListComment, addComment, selectOneComment,modifyComment} = require("../controllers/comment");

const router = express.Router();

router.get("/selectList/:b_no", selectListComment); // 게시판 리스트로이동
router.get("/selectOne/:c_no", selectOneComment); // 게시판 리스트로이동

router.post('/add2', addComment);
router.post('/modify', modifyComment);

module.exports = router;