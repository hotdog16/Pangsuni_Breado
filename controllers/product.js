const {regions, stores, products} = require('../models');


exports.createProduct = (req, res, next) => {
    stores.findAll()
        .then((stores2) => {
            console.log(stores2);
            res.render('product', {store: stores2});
        })
        .catch((err) => {
            res.send(err);
        })
}
exports.addProduct = async (req, res, next) => {
    // products.createProduct()
    // const
    // console.log('=============================================');
    // console.log('생성 ===> ', req.body);
    // console.log('생성 ===> ', req.body);
    // console.log('=============================================');
    try{
        await products.create({
            p_no : null,
            p_name: req.body.p_name,
            p_price: req.body.p_price,
            p_desc: req.body.p_desc,
            s_no: req.body.s_no,
            p_img: req.body.p_img,
        });
        res.send('등록완료!!');
    }catch (e) {
        console.error(e);
        next(e);
    }
}