const express = require("express");
// const { regions, stores, products } = require("../models");
const router = express.Router();

const {addBoard, addwrite, comNo, qnaList, addComment, addBoardDetail} = require("../controllers/board");

router.get("/", qnaList);
router.post("/", addBoard);
router.get("/write", addwrite);
router.get("/comments/:no", comNo);
router.post("/comments", addComment);
router.get("/boardDetail/:no",addBoardDetail);
module.exports = router;
