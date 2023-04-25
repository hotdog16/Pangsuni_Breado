const express = require("express");
// const { regions, stores, products } = require("../models");
const router = express.Router();

const {addBoard, aaaaa, bbbbb, qnaList} = require("../controllers/board");

router.get("/", qnaList);
router.post("/", addBoard);
router.get("/write", aaaaa);
router.get("/comments", bbbbb);

module.exports = router;
