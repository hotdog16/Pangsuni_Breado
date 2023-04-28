const express = require("express");
const {createProduct, addProduct, listProduct, modProduct, editProduct} = require('../controllers/product');
const {addOrder, userOrderList} = require('../controllers/order');
const {uerRegExp} = require('../middlewares/regExpCheck');

const router = express.Router();

router.post('/add',addOrder);

router.get('/myPage',userOrderList);

module.exports = router;