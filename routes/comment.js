const express = require("express");
const {selectListComment, addComment} = require("../controllers/comment");

const router = express.Router();

router.get("/selectList/:b_no", selectListComment); // 게시판 리스트로이동
router.post('/add2', addComment);
module.exports = router;