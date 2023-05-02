const {board, comments, products, stores} = require("../models");
const {Sequelize} = require("sequelize");

// <!-- 아래부터 페이지 네비게이션-->
exports.QnaList = async (req, res) => {
    let limit = 10; // sql select 쿼리문의 order by limit 부분
    let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
    let checkNum = (req.query.page? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
    checkNum = Math.floor(checkNum/10)*10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
    await board.findAndCountAll({ // 검색결과와 전체 count를 같이 보기 위해 사용
        limit: 10,
        offset: offset,
        order: [['b_no', 'desc']], // 최신부터 보여주기 위해 역순으로 정렬
        // include: {
        //     model: stores,
        //     as: "s_no_store",
        //     required: true
        // }
    })
        .then((qnaList) => {
            let navCheck = Math.ceil(qnaList.count / 10) * 10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
            navCheck = navCheck / 10; // 초기화 후 쉽게 체크하기 위해 재할당
            const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
            for (let i = checkNum; i < checkNum + 10; i++) { // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
                if (i < navCheck) {
                    num.push(i + 1);
                }
            }
            console.log('navCheck : ', navCheck);
            console.log('page : ', req.query.page);
            if (Number.isNaN(req.query.page) || req.query.page > navCheck) {
                res.status(400).json('숫자만 눌러주세요! 현재 페이지는 없습니다!');
            }
            // res.render('board/qnalist');
            res.render('board/qnalist', {board: qnaList, currentPage: offset, num, checkNum, user: req.user});
        })
        .catch((err) => {
            res.send(err);
        })
}

exports.QnaAdd = async (req, res, next) => {
    console.log("컨트롤러에 들어옴");
    console.log(req.body);
    const {bt_no, u_id, b_title, b_content} = req.body;
    try {
        await board.create({
            b_no: null,
            bt_no,
            u_id,
            b_title,
            b_content,
            b_done: 1,
            b_cnt: 0,
        });
        console.log(req.body);
        // res.send("QnA 등록완료!!");
        res.redirect("/qna");
    } catch (e) {
        console.error(e);
        next(e);
    }
};


// qnalist.html / 게시글 처음에서 글쓰기----------
exports.QnaForm = (req, res, next) => {
    console.log('글쓰기에 들어오는창');
    res.render("qna/qnaform");
};

exports.QnaView = async (req, res) => {
    // console.log('게시판 번호 : ', req.params.no);

    const boards = await board.findOne({
        where: {
            b_no: req.params.no
        }
    });

    await board.update({
        b_cnt : boards.b_cnt + 1
    }, {
        where: {
            b_no: req.params.no
        }
    });
    const commentList = await comments.findAll({
        where: {
            b_no: req.params.no
        }
    })
    res.render("qna/qnaview", {boards, commentList})
}

// qnalist.html / 게시글 처음에서 댓글달기(comments)----------
exports.CommentView = async (req, res, next) => {
    const boardNo = req.params.no;
    // const userId = req.user;
    // console.log('userId : ',userId);
    // console.log('boardNo : ', boardNo);
    res.render("qna/commentsadd", {bNo: boardNo}); //(뷰,데이터)
};

exports.CommentWrite = async (req, res) => {
    console.log('userID : ', req.user);
    await comments.create({
        c_no: null,
        b_no: req.body.b_no,
        u_id: req.body.u_id,
        c_content: req.body.c_content,
        c_reg_dt: Sequelize.Sequelize.literal('now()'),
        c_mod_dt: null
    })
    // res.send('test');
    res.redirect(`/qna/view/${req.body.b_no}`);
}

exports.CommentAdd = async (req, res) => {
    console.log('comment : ', req.body);
    // res.json(req.body);
    /// create
    const {b_no, bt_no, u_id, c_content} = req.body;
    await comments.create({
        c_no: null,
        b_no,
        u_id,
        c_content,
        c_reg_dt: Sequelize.Sequelize.literal('now()'),
        c_mod_dt : null
    });
    res.redirect(`/qna/view/${req.body.b_no}`);
};

// 게시판 글 삭제 버튼
exports.DeleteQnaList = async (req, res)=>{
    try{
        // console.log(req.params);
        const { b_no } = req.params;
        console.log(b_no);
        await board.destroy({
            where:{
                b_no
            }
        });

        console.log("Delete ----->", board);

        // res.status(200).json({"msg":"삭제완료"});
        res.redirect('/qna');
    }catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
}

// 게시판 글 수정 버튼
// exports.ModifyQnaList = async (req, res)=>{
//     try{
//         // console.log(req.params);
//         const { b_no } = req.params;
//         console.log(b_no);
//         await board.destroy({
//             where:{
//                 b_no
//             }정
//         });
//
//         console.log("Modify ----->", board);
//
//         // res.status(200).json({"msg":"삭제완료"});
//         res.redirect('/qna');
//     }catch (e) {
//         console.error(e);
//         res.status(400).json(e);
//     }
// }

exports.selectList = async (req, res)=>{
    const {keyword, keyword2}= req.body;
    let limit = 10; // sql select 쿼리문의 order by limit 부분
    let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
    let checkNum = (req.query.page? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
    checkNum = Math.floor(checkNum/10)*10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
    await board.findAndCountAll({ // 검색결과와 전체 count를 같이 보기 위해 사용
        limit: 10,
        offset: offset,
        where:{
            keyword: keyword2
        }
        order: [['b_no', 'desc']], // 최신부터 보여주기 위해 역순으로 정렬
        // include: {
        //     model: stores,
        //     as: "s_no_store",
        //     required: true
        // }
    })
        .then((qnaList) => {
            let navCheck = Math.ceil(qnaList.count / 10) * 10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
            navCheck = navCheck / 10; // 초기화 후 쉽게 체크하기 위해 재할당
            const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
            for (let i = checkNum; i < checkNum + 10; i++) { // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
                if (i < navCheck) {
                    num.push(i + 1);
                }
            }
            console.log('navCheck : ', navCheck);
            console.log('page : ', req.query.page);
            if (Number.isNaN(req.query.page) || req.query.page > navCheck) {
                res.status(400).json('숫자만 눌러주세요! 현재 페이지는 없습니다!');
            }
            // res.render('board/qnalist');
            res.render('board/qnalist', {board: qnaList, currentPage: offset, num, checkNum, user: req.user});
        })
        .catch((err) => {
            res.send(err);
        })
}