const express = require("express");
const {selectListComment} = require("../controllers/comment");

const router = express.Router();

router.get("/selectList/:b_no", selectListComment); // 게시판 리스트로이동

module.exports = router;