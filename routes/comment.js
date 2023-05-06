const express = require("express");
const { regions, stores, products, board } = require("../models");
const {NoticeList, NoticeWrite, NoticeForm} = require("../controllers/notice");

const router = express.Router();



module.exports = router;