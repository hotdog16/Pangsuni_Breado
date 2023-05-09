const {regions,users,products,stores,board} = require("../../models");
const {Sequelize} = require("sequelize");


exports.addFormBoard = async (req, res) => {
    res.render('admin/board/adminAddBoard');
};

exports.adminModifyBoard = async (req,res)=>{
    const b_no = req.params.b_no;
    const boards = await board.findOne({where:{b_no}});
    res.render('admin/board/adminModifyBoard', {board:boards});
}

exports.adminModifyBoardPost = async(req, res) => {
    const {b_no, b_title, b_content}=req.body;
    console.log(b_no);
    console.log(b_title);
    console.log(b_content);
    try{
        const boards =await board.update({
            b_title,
            b_content,
            b_mod_dt:Sequelize.Sequelize.literal('now()')
        },{
            where:{
                b_no
            }
        });
        if(boards === null){
            return res.status(400).json({msg:'updateError'});
        }
        return res.status(200).json({msg:'success'});
    }catch (err) {
        console.error(err);
        return res.status(500).json({msg:err});
    }
}