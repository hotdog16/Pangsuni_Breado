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
    let limit = 10;
    let offset = 0 + Number((req.query.page? req.query.page : 1) - 1) * limit;
    console.log('==============', (req.query.page? req.query.page : offset));
    console.log('req.query.page', req.query.page);
    console.log('offset', offset);
    let checkNum = (req.query.page? req.query.page : 1);
    checkNum = Math.floor(checkNum/10)*10;
    console.log('checkNum : ',checkNum);
    await products.findAndCountAll({
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
            let navCheck = Math.ceil(productList.count/10)*10;
            navCheck = navCheck/10;
            const num = [];
            for(let i = checkNum; i < checkNum+10; i++){
                if(i < navCheck){
                    num.push(i+1);
                }
            }
            res.render('product/list',{products:productList, currentPage: offset, num, checkNum});
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
