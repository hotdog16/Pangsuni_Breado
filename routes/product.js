const express = require("express");
const {createProduct, addProduct, listProduct, modProduct, editProduct} = require('../controllers/product');
const {productRegExp} = require('../middlewares/regExpCheck');

const router = express.Router();

router.get('/', listProduct); // 상품 리스트 화면으로 이동
// router.post('/', listProduct); // 상품 리스트 화면으로 이동

router.get('/add', createProduct); // 상품 추가 화면으로 이동
router.post('/add', productRegExp, addProduct);// 상품 추가 화면에서 리스트로 이동
// router.post('/add', addProduct);// 상품 추가 화면에서 리스트로 이동

router.get('/modify/:p_no', modProduct); // 상품 정보 수정 화면으로 이동
router.post('/modify', productRegExp, editProduct); // 상품 정보 수정화면에서 리스트로 이동
// router.post('/modify', editProduct); // 상품 정보 수정화면에서 리스트로 이동

// router.get('/listTest', (req, res)=>{
//     res.send('<h1>test</h1>');
// });
module.exports = router;