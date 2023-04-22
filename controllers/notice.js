const { notice } = require("../models");

exports.addBoard  = async (req, res, next) => {
    console.log('컨트롤러에 들어옴');
    console.log(req.body);
    try {
        await notice.create({
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
        res.send("공지사항등록완료!!");
    } catch (e) {
        console.error(e);
        next(e);
    }
};
