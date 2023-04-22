const multer = require('multer');
const {regions, stores, products} = require('../models');
const upload = multer({dest: '../public/images/'});

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
    // 정규표현식으로 유효성 검사
    const nameRegExp = /^[가-힣]{1,10}$/;
    const priceRegExp = /^[0-9]{1,4}$/;
    const name = req.body.p_name;
    const price = req.body.p_price;
    if (!nameRegExp.test(name)) {
        return res.send('아이디 입력이 양식에 맞지 않습니다.');
    }
    if (!priceRegExp.test(price)) {
        return res.send('가격 입력이 양식에 맞지 않습니다.');
    }
    // console.log('==========================================================================');
    // console.log('이미지 경로 : ', req.body.p_img);
    // console.log('==========================================================================');
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
        res.send('등록완료!!');
    } catch (e) {
        console.error(e);
        next(e);
    }
}

exports.listProduct = (req, res, next) => {
    products.findAll({include: {model: stores, as: "s_no_store", required: true}})
        .then((list) => {
            res.render('product/list', {products: list});
        })
        .catch((err) => {
            res.send(err);
        })
}
exports.modProduct = async (req, res, next) => {
    console.log('=========================================제품수정에 들어왔따!!!=============================');
    const no1 = req.params.p_no;

    // const item = products.findOne({where:{p_no: no}})
    products.findOne({where: {p_no: no1}})
        .then((product) => {
            console.log('수정할 제품 정보들 : ', product);
            res.render('product/modProduct', {product});
        })
        .catch((err) => {
            console.log('에러에러!!!');
            console.error(err);
            res.send(err);
        })
}