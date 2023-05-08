const express = require("express");
const router = express.Router();
const {product, formProduct, addProduct, selectListProduct,deleteProduct,modifyFormProduct, modifyProduct} = require("../../controllers/admin/adminProduct");
const {isLoggedIn,isNotLoggedIn}=require('../../middlewares/index');
const {upload} = require('../../middlewares/uploads');
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/',isLoggedIn, product);

router.get('/add',isLoggedIn, formProduct);
router.post('/add',isLoggedIn, addProduct);

router.get('/selectList',isLoggedIn, selectListProduct);

router.post('/delete',isLoggedIn, deleteProduct);

router.get('/modify/:p_no', modifyFormProduct);
router.post('/modify',isLoggedIn, upload.single('p_img'), modifyProduct);

module.exports = router;