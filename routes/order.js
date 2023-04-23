const express = require("express");
const {createProduct, addProduct, listProduct, modProduct, editProduct} = require('../controllers/product');
const {uerRegExp} = require('../middlewares/regExpCheck');

const router = express.Router();

router.get('/', (req,res)=>{

})
router.get('/add', (req,res)=>{
    res.render('')
})
router.post('/add', (req,res)=>{

})
module.exports = router;