const {stores, products} = require('../models');
const {getPagingData, getPagination} = require('./pagination');

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

exports.listProduct = async (req, res) => {
    // console.log('controllers/listProduct ======>');
    // ///////////////////////////////////////////////////
    // // let {searchType, keyword} = req.query;
    // const contentSize = Number(process.env.CONTENTSIZE);
    // console.log('contentSize : ', contentSize);
    // const currentPage = Number(req.query.currentPage) || 1;
    // console.log('currentPage : ', currentPage);
    // const {limit, offset} = getPagination(currentPage, contentSize);
    // // keyword = keyword ? keyword : "";
    // let dataAll = await products.findAll({limit, offset})
    // let dataCountAll = await products.findAndCountAll({limit, offset})
    // const pagingData = getPagingData(dataCountAll, currentPage, limit);
    // let list = dataAll;
    ///////////////////////////////////////////////////
    let limit = 10;
    let offset = 0 + Number((req.body.page? req.body.page : 1) - 1) * limit;
    // console.log('offset : ', offset);
    // let totalCnt = products.findAndCountAll({
    //     limit : limit,
    //     offset : offset,
    //     order:[['p_no', 'desc']],
    //     include: {
    //         model: stores,
    //         as: "s_no_store",
    //         required: true
    //     }
    // });
    // console.log('totalCnt : ', totalCnt);
    // totalCnt = totalCnt/10;
    products.findAndCountAll({
        limit: 10,
        offset : offset,
        order:[['p_no', 'desc']],
        include: {
            model: stores,
            as: "s_no_store",
            required: true
        }
    })
        .then((productList) => {
            // res.status(200).json({products:productList});
            // res.render('product/list',{products:productList});
            // res.status(200).json({products:productList});
            res.render('product/list',{products:productList});
            // res.render('product/list',{products:productList, list, pagingData});
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

exports.pageProduct = async (req, res, next)=>{
try{
    const posts = await products.findAll({
        where : {id : lastId},
        limit: 10,
        order :[['p_no', 'DESC']],
    });
    res.status(200).json(posts);
}catch (e) {
    console.error(e);
    next(e);
}
}