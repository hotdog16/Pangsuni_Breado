const bcrypt = require("bcrypt");
const passport = require("passport");
const { users } = require("../models");
const { Sequelize } = require("sequelize");

exports.join = async (req, res, next) => {
  const { u_id, u_pwd, u_name, u_tel, u_email } = req.body;
  console.log("req.body ,,, auth.js", req.body);
  try {
    const exUser = await users.findOne({ where: { u_id: u_id } });
    if (exUser) {
      return res.error("");
    }
    const hash = await bcrypt.hash(u_pwd, 12);
    await users.create({
      u_id,
      u_name,
      u_pwd: hash,
      u_tel,
      u_email,
      u_grade: "일반회원",
      u_reg_dt: Sequelize.Sequelize.literal("now()"),
      u_mod_dt: null,
      u_done: 1,
    });

    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.idCheck = async (req, res) => {
  const { id } = req.body;
  console.log("join--------1>", id);

  const idCheck = await users.findOne({
    where: {
      u_id: id,
    },
  });

  console.log("join--------2>", idCheck);
  if (idCheck == null) {
    return res.status(200).json({ msg: "사용가능" });
  } else {
    return res.status(500).json({ msg: "사용불가능" });
  }
};

exports.emailCheck = async (req, res) => {
  const { email } = req.body;
  console.log("email--------1>", email);

  const emailCheck = await users.findOne({
    where: {
      u_email: email,
    },
  });

  console.log("email--------2>", emailCheck);
  if (emailCheck == null) {
    return res.status(200).json({ msg: "사용가능" });
  } else {
    return res.status(500).json({ msg: "사용불가능" });
  }
};

exports.telCheck = async (req, res) => {
  const { tel } = req.body;
  console.log("email--------1>", tel);

  const telCheck = await users.findOne({
    where: {
      u_tel: tel,
    },
  });

  console.log("email--------2>", telCheck);
  if (telCheck == null) {
    return res.status(200).json({ msg: "사용가능" });
  } else {
    return res.status(500).json({ msg: "사용불가능" });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    console.log("req--------------", user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
