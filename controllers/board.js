const { board } = require("../models");

exports.addBoard  = async (req, res, next) => {
    console.log('컨트롤러에 들어옴');
    console.log(req.body);
    try {
        await board.create({
            b_no: null,
            bt_no: 2,
            u_id: req.body.u_id,
            b_title: req.body.b_title,
            b_content: req.body.b_content,
            b_reg_dt: null,
            b_mod_dt: null,
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
exports.qnaList= async (req, res, next)=> {
    // console.log('컨트롤러에 들어옴');
    // console.log(req.body);
    try{
        const ttt = await board.findAll();
        console.log('게시글 시작 ============================');
        console.log(ttt);
        for(i in ttt){
            console.log(i);
        }
        console.log('게시글 끝 ============================');
        // const tt = 'test!!!!!!!!!!!!!!!!!!';
        res.render("board",{list:ttt});
    }catch (err) {
        console.error(err);
        next(err);
    }
}

exports.aaaaa= async (req, res, next)=> {
    console.log('글쓰기에 들어온건가');
    res.render('write');
}