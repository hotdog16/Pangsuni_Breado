const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond 111111111111with a resource');
});

module.exports = router;
