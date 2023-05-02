const { Sequelize } = require("sequelize");
const { users } = require("../models");

exports.adminOrder = (req, res) => {
  res.render("admin/order", { title: "주문관리" });
};

exports.adminProduct = (req, res) => {
  res.render("admin/product", { title: "상품관리" });
};

exports.adminMember = async (req, res, next) => {
  const { u_no, u_id, u_name, u_tel, u_email, u_grade } = req.body;
  try {
    const user_list = await users.findAll();
    // console.log("유저목록 -----------");
    // console.log(user_list);
    for (u in user_list) {
      console.log(u);
    }
    // console.log("유저목록 끝 ============================");
    res.render("admin/member", { list: user_list });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.adminBoard = (req, res) => {
  res.render("admin/board", { title: "게시판관리" });
};

exports.adminStore = (req, res) => {
  res.render("admin/store", { title: "스토어관리" });
};
