const {regions,users,products,stores} = require("../../models");


exports.addFormBoard = async (req, res) => {
    res.render('admin/board/adminAddBoard');
};
