const express = require("express");
const {addOrder, userOrderList} = require('../controllers/order');
const {isLoggedIn} = require('../middlewares/index');

const router = express.Router();

router.post('/add', isLoggedIn, addOrder);

router.get('/myPage', isLoggedIn, userOrderList);

module.exports = router;