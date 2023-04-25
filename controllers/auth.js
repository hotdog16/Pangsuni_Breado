const bcrypt = require("bcrypt");
const passport = require("passport");
const { Sequelize } = require("sequelize");
const { users } = require("../models");

exports.join = async (req, res, next) => {
  const { u_id, u_pwd, u_name, u_tel, u_email, u_grade } = req.body;
  console.log("req.body ,,, auth.js", req.body);
  try {
    const exUser = await users.findOne({ where: { u_id: u_id } });
    if (exUser) {
      return res.redirect("/join?error=exist");
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

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
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