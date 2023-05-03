const { Sequelize } = require("sequelize");
const {stores, users, orders, products, regions} = require("../models");

exports.adminOrder = (req, res) => {
  res.render("admin/order", { title: "주문관리" });
};

exports.adminProduct = (req, res) => {
  res.render("admin/product", { title: "상품관리" });
};

exports.adminMember = async (req, res, next) => {
  const u_no = req.params.u_no;
  console.log('req.body ====> admin', req.user)
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


exports.member = (req,res) =>{
  const user = req.user;
  console.log("req.user ===> admin=======>",req.user)
}

exports.DetailMember = async(req,res) =>{

  console.log("userdetail111=======>",req.params);

  const {id} = req.params;
  const user = req.user;

  const userdetail = await users.findOne({
    raw: true,
    where: {
      u_no : id
    }
  })
  console.log("userdetail=======>",userdetail);
  if(userdetail){
    res.status(200).json({userdetail});
  }
}

exports.DetailOrderMember = async(req,res) =>{

  console.log("userdetail111=======>",req.params);

  const {id} = req.params;
  const user = req.user;

  const userdetailorder = await orders.findOne({
    raw: true,
    where: {
      u_id : id
    }
  })
  console.log("userdetail=======>",userdetailorder);
  if(userdetailorder){
    res.status(200).json({userdetailorder});
  }
}