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
    // console.log("REST API Get Method - Read All");
    // // 페이지 크기
    // var countPerPage = req.query.countperpage;
    // // 페이지 번호
    // var pageNo = req.query.pageno;
    // // 페이지 사이즈
    // var pageSize = req.query.pagesize;
    //
    // if (countPerPage == undefined || typeof countPerPage == "undefined" || countPerPage == null) {
    //     countPerPage = 10;
    // } else {
    //     countPerPage = parseInt(countPerPage);
    // }
    // if (pageSize == undefined || typeof pageSize == "undefined" || pageSize == null) {
    //     pageSize = 10;
    // } else {
    //     pageSize = parseInt(pageSize);
    // }
    // if (pageNo == undefined || typeof pageNo == "undefined" || pageNo == null) {
    //     pageNo = 0;
    // } else {
    //     pageNo = parseInt(pageNo);
    // }
    //
    // if (pageNo > 0) {
    //     // 전체 크기
    //     var totalCount = boardList.length;
    //     // 마지막 페이지 번호(전체 페이지 크기)
    //     var lastPageNo = Math.floor(totalCount / countPerPage) + (totalCount % countPerPage== 0 ? 0 : 1);
    //     // 시작 페이지 번호
    //     var startPageNo = 1;
    //     // 페이지 사이즈로 페이지 번호를 나눈 몫만큼 페이지 시작 번호 변경
    //     var start = Math.floor(pageNo / pageSize);
    //     if (start >= 1) {
    //         // 그렇지만 나머지가 없으면 현재 페이지 번호가 마지막 페이지 번호와 같아 감소
    //         if (pageNo % pageSize == 0){
    //             start--;
    //         }
    //         startPageNo = (start * pageSize) + 1;
    //     }
    //     // 종료 페이지 번호
    //     var endPageNo = (startPageNo - 1) + pageSize;
    //     // 그렇지만 종료 페이지 번호가 마지막 페이지 번호보다 크면 마지막 페이지 번호로 변경
    //     if (endPageNo > lastPageNo) {
    //         endPageNo = lastPageNo;
    //     }
    //     // 이전 페이지 사이즈 번호
    //     var prevPageSizeNo = startPageNo - 1;
    //     // 이전 페이지 사이즈 번호 활성화 여부
    //     var enablePrevPageSizeNO = true;
    //     if (prevPageSizeNo == 0) {
    //         enablePrevPageSizeNO = false;
    //     }
    //     // 다음 페이지 사이즈 번호
    //     var nextPageSizeNo = endPageNo + 1;
    //     // 다음 페이지 사이즈 번호 활성화 여부
    //     var enableNextPageSizeNO = true;
    //     if (nextPageSizeNo > lastPageNo) {
    //         enableNextPageSizeNO = false;
    //     }
    //     // 시작 번호
    //     var startItemNo = ((pageNo - 1) * countPerPage);
    //     // 종료 번호
    //     var endItemNo = (pageNo * countPerPage) - 1;
    //     // 종료 번호가 전체 크기보다 크면 전체 크기로 변경
    //     if (endItemNo > (totalCount - 1)) {
    //         endItemNo = totalCount - 1;
    //     }
    //     var boardPageList = [];
    //     if (startItemNo < totalCount) {
    //         for (var index = startItemNo; index <= endItemNo; index++) {
    //             boardPageList.push(boardList[index]);
    //         }
    //     }
    //     // 페이지네이션 정보
    //     var paginationInfo = {};
    //     paginationInfo.totalCount = totalCount;
    //     paginationInfo.countPerPage = countPerPage;
    //     paginationInfo.pageSize = pageSize;
    //     paginationInfo.startPageNo = startPageNo;
    //     paginationInfo.endPageNo = endPageNo;
    //     paginationInfo.lastPageNo = lastPageNo;
    //     paginationInfo.pageNo = pageNo;
    //     paginationInfo.prevPageSizeNo = prevPageSizeNo;
    //     paginationInfo.enablePrevPageSizeNO = enablePrevPageSizeNO;
    //     paginationInfo.nextPageSizeNo = nextPageSizeNo;
    //     paginationInfo.enableNextPageSizeNO = enableNextPageSizeNO;
    //     res.json({success:true, data:boardPageList, pagination:paginationInfo});
    // } else {
    //     res.json({success:true, data:boardList});
    // }
    let limit = 10;
    let offset = 0 + Number((req.body.page? req.body.page : 1) - 1) * limit;
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
            res.render('product/list',{products:productList});
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