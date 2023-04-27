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
    let limit = 10; // sql select 쿼리문의 order by limit 부분
    let offset = 0 + Number((req.query.page? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
    let checkNum = (req.query.page? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
    checkNum = Math.floor(checkNum/10)*10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
    await products.findAndCountAll({ // 검색결과와 전체 count를 같이 보기 위해 사용
        limit: 10,
        offset : offset,
        order:[['p_no', 'desc']], // 최신부터 보여주기 위해 역순으로 정렬
        include: {
            model: stores,
            as: "s_no_store",
            required: true
        }
    })
        .then((productList) => {
            let navCheck = Math.ceil(productList.count/10)*10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
            navCheck = navCheck/10; // 초기화 후 쉽게 체크하기 위해 재할당
            const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
            for(let i = checkNum; i < checkNum+10; i++){ // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
                if(i < navCheck){
                    num.push(i+1);
                }
            }
            console.log('navCheck : ',navCheck);
            console.log('page : ',req.query.page);
            if(Number.isNaN(req.query.page) || req.query.page > navCheck){
                res.status(400).json('버튼 눌러서 사용해주세용 없는 페이지에요!');
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
