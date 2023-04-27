const { stores, users, orders, products } = require("../models");

exports.list  = async (req, res) => {
    const store = await stores.findAll();
    console.log('storeList : ', store);
    res.render('store/list', {stores:store});
    // res.json(store);
};

exports.detailStore  = async (req, res) => {
    const s_no = req.params.no;
    const store = await stores.findOne({
        where:{
            s_no
        }
    });
    const product = await products.findAll({
        where:{
            s_no
        }
    });
    res.render('store/detail', {stores:store, products :product});
    // res.json(product);
};