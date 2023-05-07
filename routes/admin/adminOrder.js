const express = require("express");
const router = express.Router();
const {selectListOrder, adminOrder} = require('../../controllers/admin/adminOrder')
const {isLoggedIn} = require('../../middlewares/index');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/", adminOrder);

router.get('/selectList', selectListOrder);
module.exports = router;