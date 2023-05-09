const {regions,users,products,stores} = require("../../models");


exports.addFormBoard = async (req, res) => {
    res.render('admin/board/adminAddBoard');
};

exports.adminModifyBoard = async (req,res)=>{
    const b_no = req.params.p_no;
    const board = await products.findOne({where:{b_no}});
    res.render('admin/board/adminModifyBoard', {board, page});
}
