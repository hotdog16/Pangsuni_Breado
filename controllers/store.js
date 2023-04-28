const {stores, users, orders, products, regions} = require("../models");

exports.list = async (req, res) => {
    const store = await stores.findAll();
    const mapAPI = process.env.KAKAO_MAP;
    res.render('store/list', {stores: store, mapAPI});
};

exports.detailStore = async (req, res) => {
    const s_no = req.params.no;
    const store = await stores.findOne({
        where: {
            s_no
        }
    });
    const product = await products.findAll({
        where: {
            s_no
        }
    });
    res.render('store/detail', {stores: store, products: product});
};

exports.createStore = async (req, res) => {
    try {
        const region = await regions.findAll();
        res.render('store/add', {region});
    } catch (e) {
        console.error(e);
    }
};

// exports.detailStoreTest = async (req, res)=>{
//     try{
//         const s_no = req.params.no;
//         const store = await stores.findOne({
//             where: {
//                 s_no
//             }
//         });
//         const product = await products.findAll({
//             where: {
//                 s_no
//             }
//         });
//         res.status(400).json({stores: store, products: product});
//     }catch (e) {
//         res.status(200).json(e);
//     }
// }