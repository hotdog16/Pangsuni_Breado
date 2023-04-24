const { board } = require("../models");

exports.addBoard  = async (req, res, next) => {
    console.log('컨트롤러에 들어옴');
    console.log(req.body);
    const { bt_no,u_id,b_title,b_content }= req.body;
    try {
        await board.create({
            b_no: null,
            bt_no,
            u_id,
            b_title,
            b_content,
            b_done: 1,
            b_cnt : 0
        });
        console.log(req.body);
        // res.send("QnA 등록완료!!");
        res.redirect('/board');
    } catch (e) {
        console.error(e);
        next(e);
    }
};
// -----------아래 페이징처리가 안되면 복원하기-------------------
// exports.qnaList = async (req, res, next)=> {
//     // console.log('컨트롤러에 들어옴');
//     // console.log(req.body);
//     try{
//         const b_list = await board.findAll();
//         console.log('게시글 시작 ============================');
//         console.log(b_list);
//         for(i in b_list){
//             console.log(i);
//         }
//         console.log('게시글 끝 ============================');
//         // const tt = 'test!!!!!!!!!!!!!!!!!!';
//         res.render("board",{list:b_list});
//     }catch (err) {
//         console.error(err);
//         next(err);
//     }
// }
// ----------여기까지 페이징처리가 안되면 복원하기----------

exports.qnaList = async (req, res, next)=> {
    // console.log('컨트롤러에 들어옴');
    // console.log(req.body);
    try{
        const b_list = await board.findAll();
        console.log('게시글 시작 ============================');
        console.log(b_list);
        for(i in b_list){
            console.log(i);
        }
        console.log('게시글 끝 ============================');
        // const tt = 'test!!!!!!!!!!!!!!!!!!';
        res.render("board/board",{list:b_list});
    }catch (err) {
        console.error(err);
        next(err);
    }
}



// board.html / 게시글 처음에서 글쓰기----------
exports.aaaaa= async (req, res, next)=> {
    // console.log('글쓰기에 들어오는창');
    res.render('board/write');
}