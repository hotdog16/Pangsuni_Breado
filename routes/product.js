const express = require("express");
const {createProduct, addProduct, listProduct, modProduct, editProduct} = require('../controllers/product');
const {productRegExp} = require('../middlewares/regExpCheck');
const {isLoggedIn} = require('../middlewares/index');
const router = express.Router();

router.get('/', isLoggedIn, listProduct); // 상품 리스트 화면으로 이동

// router.get('/add', isLoggedIn, createProduct); // 상품 추가 화면으로 이동
// router.post('/add', isLoggedIn, productRegExp, addProduct);// 상품 추가 화면에서 리스트로 이동
router.get('/add', isLoggedIn, createProduct); // 상품 추가 화면으로 이동
router.post('/add', isLoggedIn, productRegExp, addProduct);// 상품 추가 화면에서 리스트로 이동

// router.get('/modify/:p_no', isLoggedIn, modProduct); // 상품 정보 수정 화면으로 이동
// router.post('/modify', isLoggedIn, productRegExp, editProduct); // 상품 정보 수정화면에서 리스트로 이동
router.get('/modify/:p_no', isLoggedIn, modProduct); // 상품 정보 수정 화면으로 이동
router.post('/modify', isLoggedIn, productRegExp, editProduct); // 상품 정보 수정화면에서 리스트로 이동

module.exports = router;