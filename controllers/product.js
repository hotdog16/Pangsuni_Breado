const {stores, products} = require('../models');

exports.createProduct = (req, res) => {
    stores.findAll()
        .then((stores2) => {
            console.log(stores2);
            res.render('product/add', {store: stores2});

            const multer = require('multer');
            const {regions, stores, products} = require('../models');
            const upload = multer({dest: '../public/images/'});
        })
}
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
    // 상품등록시 null값 허용 컬럼에 null 값이 들어가도록 하기 위함
    if (req.body.p_desc === '') {
        req.body.p_desc = null;
    }
    if (req.body.p_img === '') {
        req.body.p_img = null;
    }
    try {
        await products.create({
            p_no: null,
            p_name: req.body.p_name,
            p_price: req.body.p_price,
            p_desc: req.body.p_desc,
            s_no: req.body.s_no,
            p_img: req.body.p_img,
        });
        res.redirect('/product');
    } catch (e) {
        console.error(e);
        next(e);
    }

}

exports.listProduct = (req, res) => {
    products.findAll({include: {model: stores, as: "s_no_store", required: true}})
        .then((list) => {
            res.render('product/list', {products: list});
        })
        .catch((err) => {
            res.send(err);
        })
}
exports.modProduct = async (req, res) => {
    const no1 = req.params.p_no;

    products.findOne({where: {p_no: no1}})
        .then((product) => {
            res.render('product/modify', {product});
        })
        .catch((err) => {
            console.error(err);
            res.send(err);
        })
}

exports.editProduct = async (req, res, next) => {
    if (req.body.p_desc === '') {
        req.body.p_desc = null;
    }
    if (req.body.p_img === '') {
        req.body.p_img = null;
    }
    try {
        await products.update({
            p_name: req.body.p_name,
            p_price: req.body.p_price,
            p_desc: req.body.p_desc,
            s_no: req.body.s_no,
            p_img: req.body.p_img,
        }, {
            where: {
                p_no: req.body.p_no
            }
        });
        res.redirect('/product');
    } catch (e) {
        console.error(e);
        next(e);
    }
}