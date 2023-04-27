const { stores, users, orders } = require("../models");

exports.addOrder  = async (req, res) => {
    console.log('req.body :', req.body);
    console.log('req.user :', req.user);
    res.json({body:req.body, user:req.user});
};