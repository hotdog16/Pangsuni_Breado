const { users } = require("../models");

exports.addUser = async (req, res, next) => {
  try {
    await users.create({
      u_no: null,
      u_id: req.body.u_id,
      u_name: req.body.u_name,
      u_pwd: req.body.u_pwd,
      u_tel: req.body.u_tel,
      u_email: req.body.u_email,
      u_grade: "일반회원",
      u_reg_dt: null,
      u_mod_dt: null,
      u_done: 1,
    });
    console.log(req.body);
    res.send("등록완료!!");
  } catch (e) {
    console.error(e);
    next(e);
  }
};

exports.login = (req, res, next) => {
  const User = users.findOne({
    where: { u_id: req.body.u_id, u_pwd: req.body.u_pwd },
  });
  console.log("회원 :  ", User);
};

exports.login2 = (req, res, next) => {
  const User = users.findOne({
    where: { u_id: req.body.u_id, u_pwd: req.body.u_pwd },
  });
  console.log("회원 :  ", User);
  res.setHeader('set')
};




// .then(() => {
//     console.log(stores2);
//     res.render('product', {store: stores2});
// })
// .catch((err) => {
//     res.send(err);
//  })
