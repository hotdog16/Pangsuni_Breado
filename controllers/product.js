const {stores, products} = require('../models');

exports.createProduct = (req, res) => {
    stores.findAll()
        .then((stores2) => {
            console.log(stores2);
            res.render('product', {store: stores2});
        })
        .catch((err) => {
            res.send(err);
        })
}

exports.addProduct = (req, res, next) => {
    if (req.body.p_desc === '') {
        req.body.p_desc = null;
    }
    if (req.body.p_img === '') {
        req.body.p_img = null;
    }
    try {
        products.create({
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
            res.render('product/modProduct', {product});
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
