const express = require("express");
const {addOrder, userOrderList, selectListOrder,deleteOrder} = require('../controllers/order');
const {isLoggedIn} = require('../middlewares/index');

const router = express.Router();

router.post('/add', isLoggedIn, addOrder);

router.get('/myPage', isLoggedIn, userOrderList);

router.get('/selectList/:u_no', selectListOrder);

router.post('/delete', deleteOrder);

module.exports = router;