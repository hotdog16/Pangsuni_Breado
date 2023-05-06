const {stores, users, orders, products, regions} = require("../models");

exports.selectListRegions = async (req, res) => {
    try{
        // const store = await stores.findAll({
        //     include:{
        //         model:regions,
        //         as: 'r_no_region',
        //         required:true
        //     }
        // });
        const regionList = await regions.findAll();
        const mapAPI = process.env.KAKAO_MAP;
        // res.json(store);
        // res.render('store/list', {stores: store, mapAPI});
        res.render('store/selectListStore', {regions:regionList});
    }catch (e) {
        console.error(e);
    }
};