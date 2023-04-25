const express = require("express");
const { board } = require("../controllers/board");
const { regions, stores, products } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("/board/board", {});
});

module.exports = router;
