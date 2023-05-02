const { notice } = require("../models");
// const { BoardList } = require("./qna");

exports.NoticeList  = async (req, res, next) => {
    console.log('컨트롤러에 들어옴');
    console.log(req.body);
    try {
        await notice.create({
            b_no: null,
            bt_no:3,
            u_id: req.body.u_id,
            b_title: req.body.b_title,
            b_content: req.body.b_content,
            b_reg_dt: null,
            b_mod_dt: null,
            b_done: 1,
            b_cnt : 0
        });
        console.log(req.body);
        res.send("공지사항등록완료!!");
        res.redirect('/notice');
    } catch (e) {
        console.error(e);
        next(e);
    }
};
//
// exports.NoticeList = async (req, res) => {
//     let limit = 10; // sql select 쿼리문의 order by limit 부분
//     let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit;
//     let checkNum = (req.query.page? req.query.page : 1);
//     checkNum = Math.floor(checkNum/10)*10;
//     await notice.findAndCountAll({
//         limit: 10,
//         offset: offset,
//         order: [['b_no', 'desc']],
//     })
//         .then((NoticeList) => {
//             let navCheck = Math.ceil(NoticeList.count/10) * 10;
//             navCheck = navCheck / 10;
//             const num = [];
//             for (let i = checkNum; i < checkNum + 10; i++) {
//                 if (i <navCheck) {
//                     num.push(i +i);
//                 }
//             }
//             console.log('navCheck :', navCheck);
//             console.log('page:', req.query.page);
//             if (Number.isNan(req.query.page) || req.query.page > navCheck) {
//                 res.status(400).json('숫자만 눌러주세요! 현재 공지사항 페이지는 없어요');
//             }
//             res.render('notice/', {board: qnaList, currentPage: offset, num, checkNum, user: req.user});
//         })
//         .catch((err) => {
//             res.send(err);
//         })
// }
//
// // qnaList.html / 게시글 처음에서 글쓰기----------
// exports.NoticeForm =(req,res)=>{
//     res.send('글쓰기에 들어오는');
// }
// exports.NoticeForm =(req,res)=>{
//     res.send('OK');
// }


